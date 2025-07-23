'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, MapPin, Sparkles, Calendar, Eye, Heart, Share2, BookOpen, Zap, Star } from 'lucide-react';
import { TravelPost } from '@/data/travelPosts';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface BlogPostCardProps {
  post: TravelPost;
  index: number;
  onClick: () => void;
}

export default function BlogPostCard({ post, index, onClick }: BlogPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLElement>(null);
  
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-50px",
    amount: 0.3 
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites!', {
      icon: isLiked ? '💔' : '❤️',
      duration: 2000,
    });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Bookmark removed' : 'Bookmarked for later!', {
      icon: isBookmarked ? '📖' : '🔖',
      duration: 2000,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Share link copied to clipboard!', {
      icon: '🔗',
      duration: 2000,
    });
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.3, opacity: 0.7 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.2,
        delay: index * 0.15 + 0.3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15 + 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.article
      ref={cardRef}
      className="group cursor-pointer perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -12,
        rotateX: 5,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      <div className="travel-card overflow-hidden relative">
        {/* Hover Light Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.08), transparent 40%)`,
          }}
        />

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {post.aiGenerated && (
              <motion.div 
                className="glass-card px-3 py-1.5 flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                </motion.div>
                <span className="text-xs font-bold text-purple-600">AI Generated</span>
              </motion.div>
            )}
            
            <motion.div 
              className="glass-card px-3 py-1.5 flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-semibold text-gray-700">{post.destination}</span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleLike}
              className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 1 }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              onClick={handleBookmark}
              className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${
                isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 1.1 }}
            >
              <BookOpen className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 1.2 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Read Time Badge */}
          <motion.div 
            className="absolute bottom-4 right-4 glass-card px-3 py-1.5 flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.9 }}
          >
            <Clock className="w-3 h-3 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">{post.readTime} min read</span>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div 
          className="p-6 space-y-4"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Title */}
          <motion.h3 
            variants={itemVariants}
            className="text-xl font-bold font-playfair text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight"
          >
            {post.title}
          </motion.h3>

          {/* Excerpt */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-sm leading-relaxed line-clamp-3"
          >
            {post.excerpt}
          </motion.p>

          {/* Tags */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2"
          >
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-xs rounded-full font-medium border border-blue-100 hover:border-blue-300 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 1 + tagIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
            {post.tags.length > 3 && (
              <motion.span 
                className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-medium border border-gray-200"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 1.3 }}
              >
                +{post.tags.length - 3} more
              </motion.span>
            )}
          </motion.div>

          {/* Meta Info */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-between pt-4 border-t border-gray-100"
          >
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 1.4 + i * 0.05 }}
                >
                  <Star 
                    className={`w-3 h-3 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Read More Button */}
          <motion.div
            variants={itemVariants}
            className="pt-2"
          >
            <motion.div
              className="flex items-center space-x-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <span>Read full story</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.article>
  );
}
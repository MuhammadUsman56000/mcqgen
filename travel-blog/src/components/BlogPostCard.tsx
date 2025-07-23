'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, MapPin, Calendar, Eye, User, ArrowRight, Tag, Bookmark, Share2 } from 'lucide-react';
import { TravelPost } from '@/data/travelPosts';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface BlogPostCardProps {
  post: TravelPost;
  index: number;
  onClick: () => void;
}

export default function BlogPostCard({ post, index, onClick }: BlogPostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-20px",
    amount: 0.2 
  });

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
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0.8 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        delay: index * 0.1 + 0.2,
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
        duration: 0.5,
        delay: index * 0.1 + 0.3,
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
      className="professional-card p-0 cursor-pointer overflow-hidden group"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      {/* Professional Image Section */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Professional Overlay */}
        <div className="overlay-professional opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Professional Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {post.aiGenerated && (
            <motion.div 
              className="badge-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              AI Generated
            </motion.div>
          )}
          
          <motion.div 
            className="badge-professional flex items-center space-x-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <MapPin className="w-3 h-3" />
            <span>{post.destination}</span>
          </motion.div>
        </div>

        {/* Professional Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handleBookmark}
            className={`w-8 h-8 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 ${
              isBookmarked ? 'bg-accent-600 text-white' : 'bg-white/90 text-slate-600 hover:bg-accent-600 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 text-slate-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Reading Time */}
        <motion.div 
          className="absolute bottom-4 right-4 badge-professional flex items-center space-x-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.7 }}
        >
          <Clock className="w-3 h-3" />
          <span>{post.readTime} min</span>
        </motion.div>
      </div>

      {/* Professional Content Section */}
      <motion.div 
        className="p-6 space-y-4"
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Professional Title */}
        <motion.h3 
          variants={itemVariants}
          className="text-heading text-lg leading-tight group-hover:text-accent-600 transition-colors duration-300"
        >
          {post.title}
        </motion.h3>

        {/* Professional Excerpt */}
        <motion.p 
          variants={itemVariants}
          className="text-professional text-sm line-clamp-3"
        >
          {post.excerpt}
        </motion.p>

        {/* Professional Tags */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-2"
        >
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="badge-professional text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.8 + tagIndex * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
          {post.tags.length > 3 && (
            <motion.span 
              className="badge-professional text-xs text-slate-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1.1 }}
            >
              +{post.tags.length - 3}
            </motion.span>
          )}
        </motion.div>

        {/* Professional Meta Information */}
        <motion.div 
          variants={itemVariants}
          className="divider-professional pt-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span className="font-medium">{Math.floor(Math.random() * 2000) + 500}</span>
            </div>

            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span className="font-medium">Editor</span>
            </div>
          </div>
          
          {/* Professional Rating */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-xs font-medium text-slate-600">Featured</span>
          </div>
        </motion.div>

        {/* Professional Read More */}
        <motion.div
          variants={itemVariants}
          className="pt-2"
        >
          <motion.div
            className="flex items-center space-x-2 text-accent-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Professional Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </motion.article>
  );
}
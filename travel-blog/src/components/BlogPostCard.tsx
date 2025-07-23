'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Sparkles, Calendar } from 'lucide-react';
import { TravelPost } from '@/data/travelPosts';
import { format } from 'date-fns';

interface BlogPostCardProps {
  post: TravelPost;
  index: number;
  onClick: () => void;
}

export default function BlogPostCard({ post, index, onClick }: BlogPostCardProps) {
  return (
    <motion.article
      className="travel-card p-6 cursor-pointer group overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* AI Badge */}
        {post.aiGenerated && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-medium text-purple-600">AI Generated</span>
          </div>
        )}

        {/* Location Badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <MapPin className="w-3 h-3 text-blue-600" />
          <span className="text-xs font-medium text-gray-700">{post.destination}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-xl font-bold font-playfair text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-medium">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <motion.div
            className="text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            Read more →
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
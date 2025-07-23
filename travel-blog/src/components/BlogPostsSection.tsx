'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus, Filter } from 'lucide-react';
import BlogPostCard from './BlogPostCard';
import { TravelPost, travelPosts, generateDailyPost } from '@/data/travelPosts';

export default function BlogPostsSection() {
  const [posts, setPosts] = useState<TravelPost[]>(travelPosts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  
  // Filter posts based on selected tag
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  const handleGeneratePost = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newPost = await generateDailyPost();
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Failed to generate post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePostClick = (post: TravelPost) => {
    // In a real app, this would navigate to the full post
    console.log('Navigate to post:', post.id);
  };

  return (
    <section id="posts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair gradient-text mb-4">
            Daily AI Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fresh travel insights generated daily by artificial intelligence, 
            revealing hidden patterns and unexpected discoveries from around the world.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Tag Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedTag || ''}
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All destinations</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Generate New Post Button */}
          <motion.button
            onClick={handleGeneratePost}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating AI Story...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Generate New Story</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && selectedTag && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No stories found for "{selectedTag}"
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different destination or generate a new AI story.
            </p>
            <motion.button
              onClick={() => setSelectedTag(null)}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              View all stories
            </motion.button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Stories
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
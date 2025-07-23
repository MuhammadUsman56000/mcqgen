'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Globe, Play, Award, Users, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import toast from 'react-hot-toast';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref: inViewRef, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const stats = [
    { number: '500+', label: 'Travel Stories', icon: MapPin, color: 'text-blue-600' },
    { number: '127', label: 'Destinations', icon: Globe, color: 'text-emerald-600' },
    { number: '50K+', label: 'Readers', icon: Users, color: 'text-purple-600' },
    { number: '98%', label: 'Satisfaction', icon: Award, color: 'text-orange-600' },
  ];

  const features = [
    'Professional Travel Insights',
    'AI-Powered Content',
    'Expert Recommendations',
    'Premium Photography',
  ];

  const handleCTAClick = () => {
    toast.success('Welcome to professional travel insights!', {
      duration: 3000,
      icon: '🌍',
    });
  };

  const handleDemoClick = () => {
    toast.success('Demo video will be available soon!', {
      duration: 2000,
      icon: '🎬',
    });
  };

  return (
    <motion.section 
      ref={heroRef}
      id="home" 
      className="section-hero bg-gradient-professional relative overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f1f5f9" fill-opacity="0.4"%3E%3Ccircle cx="10" cy="10" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />

      <div className="container-professional relative z-10" ref={inViewRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center space-y-12"
        >
          {/* Professional Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div 
              className="badge-accent flex items-center space-x-2 px-6 py-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Award className="w-4 h-4 text-accent-600" />
              <span className="font-semibold">Premium Travel Content Platform</span>
            </motion.div>
          </motion.div>

          {/* Professional Headline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1
              className="text-heading text-shadow-professional"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Professional Travel
              <br />
              <motion.span 
                className="text-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Content Platform
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-professional text-xl max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Discover exceptional travel destinations through expertly curated content, 
              professional insights, and AI-enhanced storytelling that inspires informed travel decisions.
            </motion.p>
          </motion.div>

          {/* Professional Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              className="btn-primary flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
            >
              <Globe className="w-5 h-5" />
              <span>Explore Destinations</span>
            </motion.button>
            
            <motion.button
              className="btn-secondary flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoClick}
            >
              <Play className="w-5 h-5" />
              <span>Watch Overview</span>
            </motion.button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center space-x-2 badge-professional"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="w-4 h-4 text-slate-600" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Professional Statistics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="professional-card p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center ${stat.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
                
                <motion.div 
                  className="text-3xl font-bold text-slate-900 mb-2"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.4 }}
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Professional Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="pt-16 space-y-6"
          >
            <motion.p 
              className="text-slate-500 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Trusted by travel professionals worldwide
            </motion.p>
            
            <motion.div 
              className="flex justify-center items-center space-x-8 opacity-60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 2.8 }}
            >
              {/* Trust badges/logos would go here */}
              <div className="text-slate-400 text-sm font-medium">Travel + Leisure</div>
              <div className="text-slate-400 text-sm font-medium">National Geographic</div>
              <div className="text-slate-400 text-sm font-medium">Condé Nast</div>
              <div className="text-slate-400 text-sm font-medium">Lonely Planet</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Professional Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          className="text-sm text-slate-500 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.div>
        
        <motion.div
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.div
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.div>

      {/* Professional Timeline Indicator */}
      <motion.div
        className="absolute bottom-24 right-8 hidden lg:flex flex-col items-center space-y-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="professional-card p-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => toast.success('Latest content updated today!', { icon: '📅' })}
        >
          <Calendar className="w-5 h-5 text-slate-600" />
        </motion.div>
        <div className="text-xs text-slate-500 text-center">
          <div className="font-medium">Updated</div>
          <div>Today</div>
        </div>
      </motion.div>
    </motion.section>
  );
}
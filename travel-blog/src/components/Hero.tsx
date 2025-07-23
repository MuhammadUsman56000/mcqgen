'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowDown, Sparkles, Globe, Play, Star, Zap, Camera, MapPin, Calendar, Users } from 'lucide-react';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import toast from 'react-hot-toast';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { ref: inViewRef, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const floatingVariants = {
    floating: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { number: '500+', label: 'AI Stories', icon: Sparkles },
    { number: '127', label: 'Destinations', icon: MapPin },
    { number: '50K+', label: 'Readers', icon: Users },
    { number: '365', label: 'Days Active', icon: Calendar },
  ];

  return (
    <motion.section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center hero-pattern overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-xl ${
              i % 3 === 0 ? 'bg-blue-400/20' : 
              i % 3 === 1 ? 'bg-purple-400/20' : 'bg-pink-400/20'
            }`}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Particle System */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Interactive Light Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.1), transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={inViewRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Premium Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div 
              className="glass-card px-8 py-4 flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </motion.div>
              <span className="text-lg font-bold gradient-text">AI-Powered Travel Stories</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Main Headline with 3D Effect */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h1
              className="text-6xl md:text-8xl font-bold font-playfair text-gray-900 leading-tight"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              Discover the{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  background: [
                    'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
                    'linear-gradient(135deg, #ec4899 0%, #3b82f6 50%, #a855f7 100%)',
                    'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                World
              </motion.span>
              <br />
              <motion.span
                className="block"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Through AI Eyes
              </motion.span>
            </motion.h1>

            {/* Subtitle with Typing Effect */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Experience breathtaking destinations through{' '}
              <motion.span 
                className="text-blue-600 font-semibold"
                animate={{ color: ['#2563eb', '#a855f7', '#ec4899', '#2563eb'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                daily AI-generated travel stories
              </motion.span>
              , stunning photography, and insider tips that inspire your next adventure.
            </motion.p>
          </motion.div>

          {/* Action Buttons with Premium Effects */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              className="premium-button text-white px-10 py-4 text-lg flex items-center space-x-3 group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Welcome to your adventure!', { icon: '🌍' })}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-6 h-6" />
              </motion.div>
              <span className="font-bold">Explore Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            
            <motion.button
              className="glass-card text-gray-700 px-10 py-4 text-lg border-2 border-white/20 hover:border-blue-300 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Video demo coming soon!', { icon: '🎬' })}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Play className="w-4 h-4 text-white ml-0.5" />
              </motion.div>
              <span className="font-bold">Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats Section with 3D Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card-3d"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.8 }}
              >
                <motion.div 
                  className="card-3d-inner glass-card p-6 text-center group"
                  whileHover={{ y: -10, rotateY: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl font-bold text-gray-900 mb-2"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5 
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 pt-12"
          >
            {[
              { text: 'Real-time AI Generation', icon: Zap },
              { text: 'Beautiful Photography', icon: Camera },
              { text: 'Expert Insights', icon: Star },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                className="flex items-center space-x-2 glass-card px-4 py-2 text-sm text-gray-700"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator with Enhanced Animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="text-sm text-gray-500 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.div>
        
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center relative"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Floating Action Elements */}
      <motion.div
        className="absolute top-1/4 right-8 hidden lg:block"
        variants={floatingVariants}
        animate="floating"
      >
        <motion.div
          className="glass-card p-4 cursor-pointer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={() => toast.success('Quick travel tip: Always pack light!', { icon: '💡' })}
        >
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-8 hidden lg:block"
        variants={floatingVariants}
        animate="floating"
        transition={{ delay: 1 }}
      >
        <motion.div
          className="glass-card p-4 cursor-pointer"
          whileHover={{ scale: 1.1, rotate: -5 }}
          onClick={() => toast.success('Tip: Best photos are taken during golden hour!', { icon: '📸' })}
        >
          <Camera className="w-6 h-6 text-blue-500" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
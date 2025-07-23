'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Camera, Map, Compass, Search, User, Bell, Sparkles2, Zap } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '#home', icon: Compass, description: 'Welcome to wanderlust' },
    { name: 'AI Stories', href: '#posts', icon: Sparkles2, description: 'Generated adventures' },
    { name: 'Destinations', href: '#destinations', icon: Map, description: 'Explore the world' },
    { name: 'Gallery', href: '#gallery', icon: Camera, description: 'Visual journeys' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"...`, {
        duration: 2000,
        icon: '🔍',
      });
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2 
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5 + i * 0.1,
      }
    })
  };

  return (
    <>
      {/* Toast Container */}
      <div id="toast-container" />
      
      <motion.header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'navbar-blur shadow-2xl' : 'bg-transparent'
        }`}
        style={{
          backdropFilter: useTransform(headerBlur, (latest) => `blur(${latest}px)`),
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-3"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="relative w-12 h-12 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradientShift" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 via-purple-600/90 to-pink-500/90 flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl" />
              </motion.div>
              
              <div className="flex flex-col">
                <motion.span 
                  className="text-xl font-bold font-playfair gradient-text"
                  whileHover={{ scale: 1.05 }}
                >
                  Wanderlust Chronicles
                </motion.span>
                <motion.span 
                  className="text-xs text-gray-500 font-medium -mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  AI-Powered Adventures
                </motion.span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative group"
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <motion.a
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <item.icon className="w-4 h-4 relative z-10" />
                    <span className="font-medium relative z-10">{item.name}</span>
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </motion.div>
                  </motion.a>
                </motion.div>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className={`relative transition-all duration-300 ${
                  isSearchFocused ? 'w-72' : 'w-48'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search destinations..."
                    className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-sm"
                  />
                  {searchQuery && (
                    <motion.button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.form>

              {/* Action Buttons */}
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  className="p-2 rounded-xl glass-card hover:glow-blue transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success('Notifications coming soon!', { icon: '🔔' })}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                </motion.button>

                <motion.button
                  className="p-2 rounded-xl glass-card hover:glow-purple transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success('Profile coming soon!', { icon: '👤' })}
                >
                  <User className="w-5 h-5 text-gray-600" />
                </motion.button>

                <motion.button
                  className="premium-button text-white px-6 py-2 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.success('AI Magic activated!', { icon: '✨' })}
                >
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">AI Magic</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-2 rounded-xl glass-card hover:glow-blue transition-all duration-300"
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-20 left-0 right-0 glass-card mx-4 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="p-6 space-y-4">
                {/* Mobile Search */}
                <motion.form
                  onSubmit={handleSearch}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  />
                </motion.form>

                {/* Mobile Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Action Button */}
                <motion.button
                  className="w-full premium-button text-white py-3 flex items-center justify-center space-x-2 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    toast.success('AI Magic activated!', { icon: '✨' });
                  }}
                >
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Activate AI Magic</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
}
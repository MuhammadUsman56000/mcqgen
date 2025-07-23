'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, User, Bell, Globe, ChevronDown, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '#home', description: 'Return to homepage' },
    { name: 'Destinations', href: '#destinations', description: 'Explore travel destinations' },
    { name: 'Stories', href: '#stories', description: 'AI-generated content' },
    { name: 'Gallery', href: '#gallery', description: 'Photo collections' },
    { name: 'About', href: '#about', description: 'Learn more about us' },
  ];

  const profileMenuItems = [
    { name: 'Profile', icon: User, href: '#profile' },
    { name: 'Settings', icon: Settings, href: '#settings' },
    { name: 'Sign Out', icon: LogOut, href: '#signout' },
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

  const handleProfileClick = (item: string) => {
    setIsProfileOpen(false);
    toast.success(`${item} clicked`, { duration: 1500 });
  };

  return (
    <motion.header 
      ref={headerRef}
      className={`nav-professional transition-all duration-300 ${
        isScrolled ? 'shadow-luxury' : ''
      }`}
      style={{ opacity: headerOpacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container-professional">
        <div className="flex justify-between items-center h-18">
          
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-professional"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5 text-white" />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                className="text-xl font-bold text-heading"
                whileHover={{ scale: 1.02 }}
              >
                Wanderlust Chronicles
              </motion.span>
              <motion.span 
                className="text-xs text-slate-500 font-medium -mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Professional Travel Insights
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <motion.a
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded-lg text-slate-700 hover:text-slate-900 font-medium transition-all duration-200 relative"
                  whileHover={{ backgroundColor: 'rgba(148, 163, 184, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{item.name}</span>
                  
                  {/* Professional tooltip */}
                  <motion.div
                    className="tooltip-professional -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </motion.div>
                </motion.a>
              </motion.div>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Professional Search */}
            <motion.form
              onSubmit={handleSearch}
              className={`relative transition-all duration-300 ${
                isSearchFocused ? 'w-80' : 'w-64'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search destinations, stories..."
                  className="input-professional pl-10 pr-4 py-2.5 text-sm"
                />
                {searchQuery && (
                  <motion.button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
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

            {/* Professional Action Buttons */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              {/* Notifications */}
              <motion.button
                className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.success('No new notifications', { icon: '🔔' })}
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-accent-600 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </motion.div>
              </motion.button>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`} />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-48 executive-glass border border-slate-200 rounded-xl overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-2">
                        {profileMenuItems.map((item, index) => (
                          <motion.button
                            key={item.name}
                            onClick={() => handleProfileClick(item.name)}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/50 transition-colors duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <item.icon className="w-4 h-4 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            onClick={toggleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6 text-slate-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6 text-slate-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Professional Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 executive-glass mx-4 rounded-xl overflow-hidden border border-slate-200 z-40"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <motion.form
                onSubmit={handleSearch}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations..."
                  className="input-professional pl-10 pr-4 py-3"
                />
              </motion.form>

              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/50 transition-colors duration-200 group"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-gradient-accent group-hover:text-white transition-all duration-200">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-sm text-slate-500">{item.description}</div>
                    </div>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Profile Section */}
              <motion.div
                className="pt-4 border-t border-slate-200 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {profileMenuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleProfileClick(item.name);
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useSession, signOut } from 'next-auth/react';
import DarkModeToggle from './DarkModeToggle';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { isDarkMode } = useTheme();

  const dropdownItems = {
    'About': [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Partnerships', href: '/partnerships' },
    ],
    'Engage': [
      { name: 'Get Involved', href: '/get-involved' },
      { name: 'Events', href: '/events' },
      { name: 'Contact Us', href: '/contact' },
    ],
    'Resources': [
      { name: 'Policy Areas', href: '/policy-areas' },
      { name: 'Resource Hub', href: '/resources' },
      { name: 'Insights', href: '/insights' },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const renderDropdown = (name: keyof typeof dropdownItems, isMobile = false) => {
    const mobileSuffix = isMobile ? ' Mobile' : '';
    const dropdownId = `mobile-${name.toLowerCase().replace(' ', '-')}-dropdown`;

    return (
      <div className="relative" key={name}>
        <button
          onClick={() => toggleDropdown(name + mobileSuffix)}
          className={`nav-link flex items-center ${isMobile ? 'w-full text-left px-3 py-2 justify-between' : ''} ${
            activeDropdown === (name + mobileSuffix) ? 'text-secondary' : 'text-gray-700 dark:text-gray-300 hover:text-secondary'
          }`}
          aria-expanded={activeDropdown === (name + mobileSuffix)}
          aria-haspopup="true"
          aria-controls={isMobile ? dropdownId : undefined}
        >
          {name}
          <motion.svg
            className={`ml-1 h-4 w-4 ${isMobile ? '' : ''}`}
            animate={{ rotate: activeDropdown === (name + mobileSuffix) ? 180 : 0 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {activeDropdown === (name + mobileSuffix) && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : { opacity: 0, y: -10 }}
              animate={isMobile ? { height: 'auto', opacity: 1 } : { opacity: 1, y: 0 }}
              exit={isMobile ? { height: 0, opacity: 0 } : { opacity: 0, y: -10 }}
              className={isMobile ? "overflow-hidden pl-3" : "absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"}
              id={isMobile ? dropdownId : undefined}
            >
              {dropdownItems[name].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block ${isMobile ? 'px-3' : 'px-4'} py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-secondary transition-colors ${isMobile ? 'text-base' : 'text-sm'}`}
                  onClick={() => {
                    setActiveDropdown(null);
                    if (isMobile) setIsMenuOpen(false);
                  }}
                  aria-current={router.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {(Object.keys(dropdownItems) as Array<keyof typeof dropdownItems>).map((name) => renderDropdown(name))}

            <Link
              href="/arcade"
              className={`nav-link ${router.pathname === '/arcade' ? 'text-secondary' : 'text-gray-700 dark:text-gray-300 hover:text-secondary'}`}
              aria-current={router.pathname === '/arcade' ? 'page' : undefined}
            >
              Arcade
            </Link>

            <DarkModeToggle />

            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/member-area"
                  className="nav-link text-gray-700 dark:text-gray-300 hover:text-secondary"
                  aria-current={router.pathname === '/member-area' ? 'page' : undefined}
                >
                  Member Area
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
            )}

            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary focus:w-48 transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-secondary"
                aria-label="Search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="md:hidden flex items-center">
            <form onSubmit={handleSearch} className="relative mr-2">
              {showMobileSearch && (
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary focus:w-48 transition-all text-sm"
                  autoFocus
                />
              )}
              <button
                type="button"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-2 rounded-lg text-gray-700 hover:text-secondary transition-colors"
                aria-label="Search"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            <DarkModeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-40"
            id="mobile-menu"
          >
            <div className="px-4 pt-5 pb-6 space-y-1">
              {(Object.keys(dropdownItems) as Array<keyof typeof dropdownItems>).map((name) => renderDropdown(name, true))}

              <Link
                href="/arcade"
                className="block px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-current={router.pathname === '/arcade' ? 'page' : undefined}
              >
                Arcade
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-1">
                {session ? (
                  <>
                    <Link
                      href="/member-area"
                      className="block px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={router.pathname === '/member-area' ? 'page' : undefined}
                    >
                      Member Area
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 
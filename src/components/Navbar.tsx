import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownItems = {
    'Policy Areas': [
      { name: 'Education', href: '/policy/education' },
      { name: 'Environment', href: '/policy/environment' },
      { name: 'Healthcare', href: '/policy/healthcare' },
      { name: 'Technology', href: '/policy/technology' },
    ],
    'Get Involved': [
      { name: 'Volunteer', href: '/get-involved/volunteer' },
      { name: 'Donate', href: '/get-involved/donate' },
      { name: 'Partnerships', href: '/partnerships' },
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
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav className="relative">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/about" 
            className={`nav-link ${router.pathname === '/about' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}`}
            aria-current={router.pathname === '/about' ? 'page' : undefined}
          >
            About
          </Link>
          
          {/* Policy Areas Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('Policy Areas')}
              className={`nav-link flex items-center ${
                activeDropdown === 'Policy Areas' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'
              }`}
              aria-expanded={activeDropdown === 'Policy Areas'}
              aria-haspopup="true"
            >
              Policy Areas
              <motion.svg
                className="ml-1 h-4 w-4"
                animate={{ rotate: activeDropdown === 'Policy Areas' ? 180 : 0 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {activeDropdown === 'Policy Areas' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  {dropdownItems['Policy Areas'].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Get Involved Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('Get Involved')}
              className={`nav-link flex items-center ${
                activeDropdown === 'Get Involved' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'
              }`}
              aria-expanded={activeDropdown === 'Get Involved'}
              aria-haspopup="true"
            >
              Get Involved
              <motion.svg
                className="ml-1 h-4 w-4"
                animate={{ rotate: activeDropdown === 'Get Involved' ? 180 : 0 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {activeDropdown === 'Get Involved' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  {dropdownItems['Get Involved'].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/events" 
            className={`nav-link ${router.pathname === '/events' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}`}
            aria-current={router.pathname === '/events' ? 'page' : undefined}
          >
            Events
          </Link>

          <Link 
            href="/arcade" 
            className={`nav-link ${router.pathname === '/arcade' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}`}
            aria-current={router.pathname === '/arcade' ? 'page' : undefined}
          >
            Arcade
          </Link>

          <Link 
            href="/resources" 
            className={`nav-link ${router.pathname === '/resources' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}`}
            aria-current={router.pathname === '/resources' ? 'page' : undefined}
          >
            Resources
          </Link>

          <Link 
            href="/contact" 
            className={`nav-link ${router.pathname === '/contact' ? 'text-secondary' : 'text-gray-700 hover:text-secondary'}`}
            aria-current={router.pathname === '/contact' ? 'page' : undefined}
          >
            Contact
          </Link>

          {session ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/member-area"
                className="nav-link text-gray-700 hover:text-secondary"
              >
                Member Area
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:w-60 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-secondary"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:text-secondary transition-colors"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="md:hidden fixed inset-0 bg-white z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="h-full overflow-y-auto">
              <div className="px-4 pt-5 pb-6 space-y-1">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-secondary"
                      aria-label="Search"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>

                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={router.pathname === '/about' ? 'page' : undefined}
                >
                  About
                </Link>

                {/* Policy Areas Mobile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('Policy Areas Mobile')}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-secondary transition-colors flex items-center justify-between"
                    aria-expanded={activeDropdown === 'Policy Areas Mobile'}
                    aria-haspopup="true"
                    aria-controls="mobile-policy-areas-dropdown"
                  >
                    Policy Areas
                    <motion.svg
                      className="h-4 w-4"
                      animate={{ rotate: activeDropdown === 'Policy Areas Mobile' ? 180 : 0 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'Policy Areas Mobile' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                        id="mobile-policy-areas-dropdown"
                      >
                        {dropdownItems['Policy Areas'].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-6 py-2 text-gray-700 hover:text-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Get Involved Mobile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('Get Involved Mobile')}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-secondary transition-colors flex items-center justify-between"
                    aria-expanded={activeDropdown === 'Get Involved Mobile'}
                    aria-haspopup="true"
                    aria-controls="mobile-get-involved-dropdown"
                  >
                    Get Involved
                    <motion.svg
                      className="h-4 w-4"
                      animate={{ rotate: activeDropdown === 'Get Involved Mobile' ? 180 : 0 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'Get Involved Mobile' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                        id="mobile-get-involved-dropdown"
                      >
                        {dropdownItems['Get Involved'].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-6 py-2 text-gray-700 hover:text-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/events"
                  className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={router.pathname === '/events' ? 'page' : undefined}
                >
                  Events
                </Link>

                <Link
                  href="/arcade"
                  className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={router.pathname === '/arcade' ? 'page' : undefined}
                >
                  Arcade
                </Link>

                <Link
                  href="/resources"
                  className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={router.pathname === '/resources' ? 'page' : undefined}
                >
                  Resources
                </Link>

                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={router.pathname === '/contact' ? 'page' : undefined}
                >
                  Contact
                </Link>

                {session ? (
                  <>
                    <Link
                      href="/member-area"
                      className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Member Area
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
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
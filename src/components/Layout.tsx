import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);
  const lastFocusableElementRef = useRef<HTMLButtonElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Update dropdown items with correct paths
  const dropdownItems = useMemo(() => ({
    'Policy Areas': [
      { name: 'Education', href: '/policy-areas#education' },
      { name: 'Environment', href: '/policy-areas#environment' },
      { name: 'Health', href: '/policy-areas#health' },
      { name: 'Technology', href: '/policy-areas#technology' },
    ],
    'Get Involved': [
      { name: 'Join Us', href: '/get-involved#join' },
      { name: 'Volunteer', href: '/get-involved#volunteer' },
      { name: 'Partnerships', href: '/get-involved#partnerships' },
    ],
  }), []);

  // Add search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Memoize event handlers
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
    setActiveDropdown(null);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }
  }, []);

  const toggleDropdown = useCallback((name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  }, [activeDropdown]);

  const handleDropdownKeyDown = useCallback((event: React.KeyboardEvent, name: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown(name);
    } else if (event.key === 'Escape') {
      setActiveDropdown(null);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const dropdown = dropdownRefs.current[name];
      if (dropdown) {
        const items = dropdown.querySelectorAll('[role="menuitem"]');
        const currentIndex = Array.from(items).indexOf(document.activeElement as Element);
        const nextIndex = event.key === 'ArrowDown' 
          ? (currentIndex + 1) % items.length 
          : (currentIndex - 1 + items.length) % items.length;
        (items[nextIndex] as HTMLElement).focus();
      }
    }
  }, [toggleDropdown]);

  // Handle touch gestures for mobile menu
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) { // Swipe left
      setIsMenuOpen(false);
    }
  }, [touchStart]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Handle keyboard navigation
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      firstFocusableElementRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleFocus = (e: FocusEvent) => {
      if (!mobileMenuRef.current?.contains(e.target as Node)) {
        firstFocusableElementRef.current?.focus();
      }
    };

    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-primary">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-secondary"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className="bg-primary shadow-md fixed w-full z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/about" 
                className="nav-link"
                aria-current={router.pathname === '/about' ? 'page' : undefined}
              >
                About
              </Link>
              
              {/* Policy Areas Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('Policy Areas')}
                  onKeyDown={(e) => handleDropdownKeyDown(e, 'Policy Areas')}
                  className="nav-link flex items-center"
                  aria-expanded={activeDropdown === 'Policy Areas'}
                  aria-haspopup="true"
                >
                  Policy Areas
                  <svg className={`ml-1 h-4 w-4 transform transition-transform ${activeDropdown === 'Policy Areas' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'Policy Areas' && (
                  <div className="dropdown-menu" role="menu" aria-orientation="vertical">
                    {dropdownItems['Policy Areas'].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="dropdown-item"
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Get Involved Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('Get Involved')}
                  onKeyDown={(e) => handleDropdownKeyDown(e, 'Get Involved')}
                  className="nav-link flex items-center"
                  aria-expanded={activeDropdown === 'Get Involved'}
                  aria-haspopup="true"
                >
                  Get Involved
                  <svg className={`ml-1 h-4 w-4 transform transition-transform ${activeDropdown === 'Get Involved' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'Get Involved' && (
                  <div className="dropdown-menu" role="menu" aria-orientation="vertical">
                    {dropdownItems['Get Involved'].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="dropdown-item"
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/events" 
                className="nav-link"
                aria-current={router.pathname === '/events' ? 'page' : undefined}
              >
                Events
              </Link>
              <Link 
                href="/contact" 
                className="nav-link"
                aria-current={router.pathname === '/contact' ? 'page' : undefined}
              >
                Contact
              </Link>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 px-4 py-2 rounded-lg bg-primary-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:w-60 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
              <button
                ref={firstFocusableElementRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-primary-800 text-white hover:bg-primary-700 transition-colors"
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
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`md:hidden fixed inset-0 bg-primary transition-all duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
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
                    className="w-full px-4 py-2 rounded-lg bg-primary-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
                className="block px-3 py-2 text-white hover:bg-primary-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-current={router.pathname === '/about' ? 'page' : undefined}
              >
                About
              </Link>

              {/* Policy Areas Mobile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('Policy Areas Mobile')}
                  onKeyDown={(e) => handleDropdownKeyDown(e, 'Policy Areas Mobile')}
                  className="w-full text-left px-3 py-2 text-white hover:bg-primary-800 transition-colors flex items-center justify-between"
                  aria-expanded={activeDropdown === 'Policy Areas Mobile'}
                  aria-haspopup="true"
                  aria-controls="mobile-policy-areas-dropdown"
                >
                  Policy Areas
                  <svg className={`h-4 w-4 transform transition-transform ${activeDropdown === 'Policy Areas Mobile' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id="mobile-policy-areas-dropdown"
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'Policy Areas Mobile' ? 'max-h-48' : 'max-h-0'
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                >
                  {dropdownItems['Policy Areas'].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-2 text-white hover:bg-primary-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Get Involved Mobile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('Get Involved Mobile')}
                  onKeyDown={(e) => handleDropdownKeyDown(e, 'Get Involved Mobile')}
                  className="w-full text-left px-3 py-2 text-white hover:bg-primary-800 transition-colors flex items-center justify-between"
                  aria-expanded={activeDropdown === 'Get Involved Mobile'}
                  aria-haspopup="true"
                  aria-controls="mobile-get-involved-dropdown"
                >
                  Get Involved
                  <svg className={`h-4 w-4 transform transition-transform ${activeDropdown === 'Get Involved Mobile' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id="mobile-get-involved-dropdown"
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'Get Involved Mobile' ? 'max-h-48' : 'max-h-0'
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                >
                  {dropdownItems['Get Involved'].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-2 text-white hover:bg-primary-800 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/events"
                className="block px-3 py-2 text-white hover:bg-primary-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-current={router.pathname === '/events' ? 'page' : undefined}
              >
                Events
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:bg-primary-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-current={router.pathname === '/contact' ? 'page' : undefined}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        id="main-content" 
        className="min-h-screen pt-16"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-6" />
              <p className="text-gray-300">
                Empowering youth to shape policy and create positive change in society.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/policy-areas" className="footer-link">
                    Policy Areas
                  </Link>
                </li>
                <li>
                  <Link href="/get-involved" className="footer-link">
                    Get Involved
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@youthpolicyforum.org" className="footer-link">
                    info@youthpolicyforum.org
                  </a>
                </li>
                <li>
                  <a href="tel:+15551234567" className="footer-link">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="text-gray-300">
                  123 Policy Street, New York, NY 10001
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-700 text-center text-gray-300 text-sm">
            <p>© {new Date().getFullYear()} Youth Policy Forum. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Loading State */}
      <div 
        className="fixed inset-0 bg-primary-800 flex items-center justify-center z-50 transition-opacity duration-300 opacity-0 pointer-events-none"
        role="alert"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
} 
import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm0 36c-8.8 0-16-7.2-16-16S11.2 4 20 4s16 7.2 16 16-7.2 16-16 16z"
              className="fill-white"
            />
            <path
              d="M28.5 11.5C26.3 9.3 23.3 8 20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12c3.3 0 6.3-1.3 8.5-3.5"
              className="stroke-white"
              strokeWidth="2"
            />
            <path
              d="M20 8c-3.3 0-6.3 1.3-8.5 3.5C13.7 9.3 16.7 8 20 8z"
              className="fill-secondary"
            />
            <path
              d="M11.5 11.5C9.3 13.7 8 16.7 8 20c0-3.3 1.3-6.3 3.5-8.5z"
              className="fill-accent"
            />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="text-xl font-bold tracking-wide text-white">
          <span className="block">YOUTH POLICY</span>
          <span className="block">FORUM</span>
        </div>
      )}
    </Link>
  );
} 
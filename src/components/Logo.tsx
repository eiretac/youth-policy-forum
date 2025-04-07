import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Youth Policy Forum Logo"
        width={150}
        height={150}
        className="w-auto h-8 md:h-10"
        priority
      />
      {showText && (
        <div className="text-xl font-bold tracking-wide text-white">
          <span className="block">YOUTH POLICY</span>
          <span className="block">FORUM</span>
        </div>
      )}
    </Link>
  );
} 
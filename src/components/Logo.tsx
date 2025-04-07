import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Youth Policy Forum Logo"
        width={150}
        height={150}
        className="w-auto h-12 md:h-14"
        priority
      />
    </Link>
  );
} 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'small' | 'large';
  colorVariant?: 'dark' | 'light';
}

export default function Logo({ className = '', variant = 'default', colorVariant = 'dark' }: LogoProps) {
  const sizes = {
    small: {
      height: 32,
      className: 'h-8 md:h-8'
    },
    default: {
      height: 48,
      className: 'h-10 md:h-12'
    },
    large: {
      height: 64,
      className: 'h-12 md:h-16'
    }
  };

  const { height, className: sizeClassName } = sizes[variant];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={`/images/logo-${colorVariant}.png`}
        alt="Youth Policy Forum Logo"
        width={height * 2}
        height={height}
        className={`w-auto ${sizeClassName} object-contain`}
        priority
        quality={90}
      />
    </Link>
  );
} 
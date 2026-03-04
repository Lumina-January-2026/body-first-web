'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/common/Button';
import Navigation from './Navigation';

const navLinks = [
  { href: '/resources', label: 'Resources' },
  { href: '/guides', label: 'Guides' },
  { href: '/tools', label: 'Tools' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-blue sticky top-0 z-50 rounded-b-brand-card shadow-md overflow-hidden">
      {/* Decorative abstract shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-8 -right-12 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute top-2 right-24 w-20 h-20 rounded-full bg-white/[0.03]" />
        <div className="absolute -bottom-6 left-16 w-32 h-32 rounded-full bg-white/[0.04]" />
        <div className="absolute top-1 left-1/3 w-48 h-6 rounded-full bg-white/[0.03] rotate-[-8deg]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 text-white">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Body First
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button — white pill on blue header */}
        <div className="hidden md:block">
          <Button
            href="/get-started"
            size="sm"
            className="!bg-white !text-brand-dark hover:!bg-gray-100"
          >
            Get the App
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <Navigation open={menuOpen} links={navLinks} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

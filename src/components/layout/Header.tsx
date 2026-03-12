'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from './Navigation';
import JoinModal from '@/components/community/JoinModal';
import CreatePostModal from '@/components/community/CreatePostModal';
import { useProfile } from '@/components/community/ProfileContext';
import { getInitial } from '@/lib/profile';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { profile, isAuthenticated, signIn, signOut, showProfileModal, openProfileModal, closeProfileModal } = useProfile();

  const handleShareClick = () => {
    if (!isAuthenticated) {
      signIn();
      return;
    }
    if (!profile) {
      openProfileModal();
      return;
    }
    setShowCreateModal(true);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 text-teal-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Body First
            </span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleShareClick}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors px-4 py-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Share Your Story
            </button>
            {isAuthenticated && profile ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: profile.color }}
                  aria-label="Profile menu"
                >
                  {getInitial(profile.nickname)}
                </button>
                {showDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg z-50 py-1">
                      <button
                        onClick={() => { setShowDropdown(false); openProfileModal(); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Edit profile
                      </button>
                      <button
                        onClick={() => { setShowDropdown(false); signOut(); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={signIn}
                className="bg-teal-primary hover:bg-teal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
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

        <Navigation
          open={menuOpen}
          links={navLinks}
          onClose={() => setMenuOpen(false)}
          onJoinClick={() => {
            setMenuOpen(false);
            if (!isAuthenticated) {
              signIn();
            } else {
              openProfileModal();
            }
          }}
        />
      </header>

      <JoinModal open={showProfileModal} onClose={closeProfileModal} />
      <CreatePostModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={() => {
          setShowCreateModal(false);
          window.dispatchEvent(new Event('community:post-created'));
        }}
      />
    </>
  );
}

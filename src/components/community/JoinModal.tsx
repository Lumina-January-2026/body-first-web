'use client';

import { useState, useEffect } from 'react';
import { PROFILE_COLORS, getInitial } from '@/lib/profile';
import { useProfile } from './ProfileContext';

interface JoinModalProps {
  open: boolean;
  onClose: () => void;
}

export default function JoinModal({ open, onClose }: JoinModalProps) {
  const { profile, saveProfile } = useProfile();
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState(PROFILE_COLORS[0]);

  // Pre-fill with existing profile data when editing
  useEffect(() => {
    if (open && profile) {
      setNickname(profile.nickname);
      setColor(profile.color);
    }
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    await saveProfile(nickname.trim(), color);
    onClose();
  };

  const initial = nickname.trim() ? getInitial(nickname) : '?';
  const isEditing = !!profile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl animate-modal-in overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {isEditing ? 'Edit your profile' : 'Set up your profile'}
          </h2>
          <p className="text-gray-500 mb-6">
            Choose a nickname and color. This is how you&apos;ll appear in the community.
          </p>

          {/* Avatar preview */}
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center transition-colors"
            style={{ backgroundColor: color }}
          >
            <span className="text-2xl font-bold text-white">{initial}</span>
          </div>

          <form onSubmit={handleSubmit} className="text-left space-y-5">
            {/* Nickname */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                required
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. jones.p"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-primary/30 focus:border-teal-primary focus:outline-none transition-all"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                This can be anonymous — you don&apos;t need to use your real name.
              </p>
            </div>

            {/* Color picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Profile color
              </label>
              <div className="flex items-center gap-3">
                {PROFILE_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className="w-11 h-11 rounded-full transition-all flex items-center justify-center"
                    style={{
                      backgroundColor: c,
                      boxShadow: color === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : 'none',
                    }}
                    aria-label={`Select color ${c}`}
                  >
                    {color === c && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!nickname.trim()}
              className="w-full bg-teal-primary hover:bg-teal-dark text-white font-semibold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-40"
            >
              {isEditing ? 'Save changes' : 'Create profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

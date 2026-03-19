/**
 * CreatePostModal — form for creating community posts.
 *
 * Creates posts with both user_id (for RLS) and profile_id (for display).
 */

'use client';

import { useState, useEffect } from 'react';
import { useProfile } from './ProfileContext';
import { createPost } from '@/lib/community';
import { COMMUNITY_CATEGORIES, MEDICATIONS, MEDICATION_LABELS } from '@/types/resource';
import type { CommunityCategory, Medication } from '@/types/resource';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export default function CreatePostModal({ open, onClose, onPostCreated }: CreatePostModalProps) {
  const { profile, user, openProfileModal } = useProfile();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<CommunityCategory>('General');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!profile) {
      openProfileModal();
      onClose();
      return;
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, profile, openProfileModal, onClose]);

  if (!open || !profile || !user) return null;

  const toggleMedication = (med: Medication) => {
    setMedications((prev) =>
      prev.includes(med) ? prev.filter((m) => m !== med) : [...prev, med],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !user) return;
    setSubmitting(true);
    const post = await createPost(user.id, profile.id, title.trim(), body.trim(), category, medications);
    setSubmitting(false);
    if (post) {
      setTitle('');
      setBody('');
      setCategory('General');
      setMedications([]);
      onPostCreated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-modal-in overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Share Your Story</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your experience can help someone just starting their journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="post-title" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Title
              </label>
              <input
                id="post-title"
                type="text"
                required
                maxLength={120}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My first month on Wegovy"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-primary/30 focus:border-teal-primary focus:outline-none transition-all"
              />
            </div>

            {/* Body */}
            <div>
              <label htmlFor="post-body" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Your story
              </label>
              <textarea
                id="post-body"
                required
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience, tips, or questions..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-primary/30 focus:border-teal-primary focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="post-category" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Topic
              </label>
              <select
                id="post-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityCategory)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-teal-primary/30 focus:border-teal-primary focus:outline-none transition-all bg-white"
              >
                {COMMUNITY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Medications */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Medications (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {MEDICATIONS.filter((m) => m !== 'general').map((med) => (
                  <button
                    key={med}
                    type="button"
                    onClick={() => toggleMedication(med)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      medications.includes(med)
                        ? 'bg-teal-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {MEDICATION_LABELS[med]}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!title.trim() || !body.trim() || submitting}
              className="w-full bg-teal-primary hover:bg-teal-dark text-white font-semibold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-40"
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

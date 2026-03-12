'use client';

import { useProfile } from './ProfileContext';
import { getInitial } from '@/lib/profile';

interface JoinCardProps {
  onJoinClick: () => void;
}

export default function JoinCard({ onJoinClick }: JoinCardProps) {
  const { profile } = useProfile();

  if (profile) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 text-center">
          <div
            className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ backgroundColor: profile.color }}
          >
            <span className="text-xl font-bold text-white">{getInitial(profile.nickname)}</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">{profile.nickname}</p>
          <p className="text-xs text-gray-400 mt-0.5">Community member</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Illustration area */}
      <div className="bg-gradient-to-br from-teal-50 to-peach-start p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-1">
            {'\u{1F44B}\u{1F31F}'}
          </div>
        </div>
      </div>

      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Join The Conversation</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Create a free anonymous profile to post, comment, and react in the community.
        </p>
        <button
          onClick={onJoinClick}
          className="w-full bg-teal-primary hover:bg-teal-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}

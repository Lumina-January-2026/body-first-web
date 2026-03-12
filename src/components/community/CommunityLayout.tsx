'use client';

import { useState } from 'react';
import { useProfile } from './ProfileContext';
import CategoryNav from './CategoryNav';
import CommunityFeed from './CommunityFeed';
import RightSidebar from './RightSidebar';

export default function CommunityLayout() {
  const [activeFilter, setActiveFilter] = useState<{
    type: 'medication' | 'category';
    value: string;
  } | null>(null);
  const { openProfileModal } = useProfile();

  return (
    <>
      {/* Mobile category chips */}
      <div className="lg:hidden mb-4">
        <CategoryNav mode="mobile" activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <CategoryNav mode="desktop" activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* Center feed */}
        <CommunityFeed activeFilter={activeFilter} />

        {/* Right sidebar */}
        <RightSidebar onJoinClick={openProfileModal} />
      </div>
    </>
  );
}

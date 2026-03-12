import JoinCard from './JoinCard';
import AppDownloadCard from './AppDownloadCard';
import GuidelinesCard from './GuidelinesCard';

interface RightSidebarProps {
  onJoinClick: () => void;
}

export default function RightSidebar({ onJoinClick }: RightSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
      <JoinCard onJoinClick={onJoinClick} />
      <AppDownloadCard />
      <GuidelinesCard />
    </aside>
  );
}

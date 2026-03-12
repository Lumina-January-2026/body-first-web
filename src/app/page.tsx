import CommunityLayout from '@/components/community/CommunityLayout';
import StructuredData from '@/components/seo/StructuredData';

export default function Home() {
  return (
    <>
      <StructuredData type="WebSite" name="Body First" url="https://bodyfirst.app" />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <CommunityLayout />
      </div>
    </>
  );
}

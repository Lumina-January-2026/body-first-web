import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 text-teal-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">Body First</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>&copy; {new Date().getFullYear()} Boolean Bliss LLC</span>
          <span className="text-gray-200">&middot;</span>
          <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
          <span className="text-gray-200">&middot;</span>
          <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
          <span className="text-gray-200">&middot;</span>
          <Link href="/about" className="hover:text-gray-700 transition-colors">About</Link>
          <span className="text-gray-200">&middot;</span>
          <Link href="/support" className="hover:text-gray-700 transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}

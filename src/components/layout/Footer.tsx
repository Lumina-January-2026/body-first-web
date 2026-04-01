import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 flex flex-col items-center gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/body-first-logo.png"
            alt="Body First"
            width={100}
            height={23}
            className="h-6 w-auto"
          />
        </Link>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
          <span className="text-gray-200">&middot;</span>
          <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
          <span className="text-gray-200">&middot;</span>
          <Link href="/about" className="hover:text-gray-700 transition-colors">About</Link>
          <span className="text-gray-200">&middot;</span>
          <Link href="/support" className="hover:text-gray-700 transition-colors">Support</Link>
        </div>
        <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Boolean Bliss LLC</span>
      </div>
    </footer>
  );
}

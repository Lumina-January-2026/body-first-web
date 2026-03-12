import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  open: boolean;
  links: NavLink[];
  onClose: () => void;
  onJoinClick?: () => void;
}

export default function Navigation({ open, links, onClose, onJoinClick }: NavigationProps) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t border-gray-100 bg-white">
      <nav className="flex flex-col px-4 py-3 gap-0.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-2">
          <button
            onClick={() => { onClose(); onJoinClick?.(); }}
            className="w-full bg-teal-primary hover:bg-teal-dark text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            Join the Community
          </button>
        </div>
      </nav>
    </div>
  );
}

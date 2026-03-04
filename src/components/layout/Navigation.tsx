import Link from 'next/link';
import Button from '@/components/common/Button';

interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  open: boolean;
  links: NavLink[];
  onClose: () => void;
}

export default function Navigation({ open, links, onClose }: NavigationProps) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t border-white/10 bg-brand-blue relative">
      <nav className="flex flex-col px-6 py-4 gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-3 pt-3 border-t border-white/10">
          <Button href="/get-started" size="md" fullWidth className="!bg-white !text-brand-dark hover:!bg-gray-100">
            Get the App
          </Button>
        </div>
      </nav>
    </div>
  );
}

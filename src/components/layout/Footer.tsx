import Link from 'next/link';
import NewsletterSignup from '@/components/cta/NewsletterSignup';

const exploreLinks = [
  { href: '/resources', label: 'Resources' },
  { href: '/guides', label: 'Guides' },
  { href: '/tools', label: 'Tools' },
  { href: '/compare', label: 'Compare Medications' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/get-started', label: 'Get Started' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-gray-300">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 text-white mb-4">
              <div className="w-6 h-6 text-teal-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
                </svg>
              </div>
              <span className="text-lg font-bold">Body First</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering your wellness journey with trusted information and supportive tools.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-teal-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-teal-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4">Stay Connected</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates and health tips.</p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Boolean Bliss LLC. All rights reserved.
            Content is for informational purposes only — always consult your healthcare provider.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

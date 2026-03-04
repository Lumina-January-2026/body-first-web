interface BadgeProps {
  children: React.ReactNode;
  variant?: 'coral' | 'teal' | 'gray' | 'peach';
  className?: string;
}

const variants = {
  coral: 'bg-orange-100 text-orange-700',
  teal: 'bg-teal-50 text-teal-700',
  gray: 'bg-gray-100 text-gray-600',
  peach: 'bg-orange-50 text-orange-800',
};

export default function Badge({ children, variant = 'coral', className = '' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

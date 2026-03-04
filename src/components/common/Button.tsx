import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-brand-dark hover:bg-gray-800 text-white shadow-button hover:shadow-lg',
  secondary:
    'bg-coral hover:bg-orange-600 text-white shadow-button hover:shadow-lg',
  outline:
    'bg-white border-2 border-brand-divider text-brand-dark hover:bg-gray-50',
  ghost:
    'bg-transparent text-brand-dark hover:bg-black/5',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-brand-pill font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

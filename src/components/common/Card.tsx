interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ children, className = '', hover = false, padding = 'lg', bordered = false }: CardProps) {
  return (
    <div
      className={`bg-white shadow-card rounded-brand-card ${paddings[padding]} ${bordered ? 'border-[5px] border-white' : ''} ${hover ? 'transition-all duration-300 hover:shadow-elevated hover:-translate-y-1' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

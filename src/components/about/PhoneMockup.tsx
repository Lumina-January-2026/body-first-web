'use client';
import Image from 'next/image';

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function PhoneMockup({ src, alt, className = '', priority = false }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: '280px', maxWidth: '100%' }}>
      {/* Device frame */}
      <div className="relative rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-white" style={{ aspectRatio: '9/19.5' }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority={priority}
            sizes="280px"
          />
        </div>
      </div>
    </div>
  );
}

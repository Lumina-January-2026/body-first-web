import Image from 'next/image';

export default function AppDownloadCard() {
  return (
    <div className="bg-nav-dark rounded-2xl p-5 text-center text-white">
      <p className="text-sm text-gray-300 mb-4">
        Track your journey, manage side effects, and so much more.
      </p>

      {/* QR code */}
      <a
        href="https://apps.apple.com/us/app/body-first/id6757570268"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-36 h-36 mx-auto mb-4 bg-white rounded-xl overflow-hidden"
      >
        <Image
          src="/images/app-qr-code.gif"
          alt="Scan to download Body First on the App Store"
          width={144}
          height={144}
          className="w-full h-full object-contain p-2"
        />
      </a>

      {/* Stars */}
      <div className="flex items-center justify-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Store badge */}
      <a
        href="https://apps.apple.com/us/app/body-first/id6757570268"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 bg-white text-nav-dark text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        Download on the App Store
      </a>
    </div>
  );
}

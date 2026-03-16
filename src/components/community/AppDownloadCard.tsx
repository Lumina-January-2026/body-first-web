export default function AppDownloadCard() {
  return (
    <div className="bg-nav-dark rounded-2xl p-5 text-center text-white">
      <p className="text-sm text-gray-300 mb-4">
        Track your journey, manage side effects, and so much more.
      </p>

      {/* QR code placeholder */}
      <div className="w-36 h-36 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/>
            <rect x="18" y="14" width="3" height="3"/><rect x="14" y="18" width="3" height="3"/>
            <rect x="18" y="18" width="3" height="3"/>
          </svg>
          <span className="text-xs">QR Code</span>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center justify-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
        <span className="text-sm text-gray-300 ml-1">8M+ users</span>
      </div>

      {/* Store badges */}
      <p className="text-xs text-gray-400 mt-4">Coming soon to App Store & Google Play</p>
    </div>
  );
}

import Button from '@/components/common/Button';

export default function AppDownloadCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nav-dark to-[#2a2a3d] p-5 md:p-12">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-teal-primary/10" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-coral/10" />

      <div className="relative flex flex-col md:flex-row items-center gap-8">
        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Take Body First Everywhere
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-lg">
            Personalized GLP-1 guidance, cost-saving tools, side effect tracking, and a
            supportive community — all in one app. Your journey, your pace.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button href="/get-started" size="lg">
              Get Started Free
            </Button>
            <Button href="/resources" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              Explore Resources
            </Button>
          </div>
        </div>

        {/* App mockup placeholder */}
        <div className="hidden md:flex flex-shrink-0">
          <div className="w-48 h-80 rounded-3xl bg-gradient-to-br from-peach-start to-peach-end border-4 border-white/20 shadow-2xl flex items-center justify-center">
            <div className="text-center px-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-primary to-teal-dark flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700">Body First</p>
              <p className="text-xs text-gray-500 mt-1">Your GLP-1 Companion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

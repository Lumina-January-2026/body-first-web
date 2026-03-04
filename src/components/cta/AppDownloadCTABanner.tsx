import Button from '@/components/common/Button';

export default function AppDownloadCTABanner() {
  return (
    <section className="bg-nav-dark py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Take Body First Everywhere
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
              Personalized GLP-1 guidance, cost-saving tools, side effect tracking, and a
              supportive community — all in one app. Your journey, your pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button href="/get-started" size="lg">
                Get Started Free
              </Button>
              <Button
                href="/resources"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Explore Resources
              </Button>
            </div>
          </div>

          {/* App mockup */}
          <div className="hidden md:flex flex-shrink-0">
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-teal-primary/10 rounded-[2rem] blur-2xl" />
              <div className="relative w-52 h-[340px] rounded-3xl bg-gradient-to-br from-peach-start to-peach-end border-4 border-white/20 shadow-2xl flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-primary to-teal-dark flex items-center justify-center shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-base font-bold text-gray-800">Body First</p>
                  <p className="text-xs text-gray-500 mt-1">Your GLP-1 Companion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Button from '@/components/common/Button';

export const metadata: Metadata = {
  title: 'About Body First',
  description:
    'Body First is a trusted resource hub for GLP-1 medication planning. Learn about our mission to empower informed health decisions.',
};

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
    title: 'Evidence-Based',
    description: 'All our resources are meticulously reviewed by medical professionals to ensure accuracy and relevance to your needs.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    title: 'No Judgment Zone',
    description: 'We foster a safe, inclusive space where you can learn, share, and grow without fear of stigma or bias.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Always Free',
    description: 'Accessible information for everyone. We believe vital health knowledge should be free and easy to find.',
  },
];

const disclaimers = [
  { title: 'We don\'t prescribe', description: 'We are an information hub, not a clinic. We do not write prescriptions.' },
  { title: 'We don\'t replace doctors', description: 'Our content is educational. Always consult your healthcare provider.' },
  { title: 'We don\'t sell data', description: 'Your privacy is paramount. We do not sell your personal health data.' },
  { title: 'No medical claims', description: 'We do not make unverified medical claims or promise results.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Mission Hero — peach gradient */}
      <section className="bg-gradient-to-b from-peach-start to-peach-end py-16 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex flex-col gap-6 flex-1 text-center md:text-left">
              <h1 className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                About Body First
              </h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-[600px] mx-auto md:mx-0">
                Clear, supportive information for your GLP-1 medication journey. We empower you with the
                knowledge needed to make informed decisions about your health.
              </p>
              <div className="pt-4 flex justify-center md:justify-start gap-4">
                <Button href="/resources" size="lg">
                  Explore Resources
                </Button>
              </div>
            </div>
            <div className="w-full flex-1">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-primary/10 to-peach-start flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <svg width="48" height="48" fill="#1E3054" viewBox="0 0 48 48">
                      <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"/>
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">Body First</p>
                  <p className="text-gray-500 mt-1">Wellness Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Text */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center flex flex-col gap-8">
          <span className="text-teal-primary font-bold tracking-widest uppercase text-sm">Our Purpose</span>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight">
            Empowering Your Health Journey
          </h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              We believe everyone deserves access to clear, evidence-based information about GLP-1
              medications without the jargon or judgment. The healthcare landscape can be confusing,
              especially when navigating new treatments.
            </p>
            <p>
              Our goal is to empower individuals to take control of their wellness journey through
              education and community support. We bridge the gap between complex medical data and your
              daily life, making health literacy accessible to all.
            </p>
            <p>
              Whether you are just starting to research options or have been on a treatment plan for months,
              Body First is here to provide the clarity and confidence you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-peach-end py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4 mb-12 text-center">
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-base">
              Built on a foundation of trust, transparency, and unwavering support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 rounded-xl border border-gray-100 bg-white p-8 flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-teal-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-teal-primary mb-2">
                  {value.icon}
                </div>
                <h3 className="text-gray-900 text-xl font-bold leading-tight">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teal Banner */}
      <section className="bg-gradient-to-r from-teal-dark to-teal-primary py-16 px-6 text-center text-white">
        <div className="max-w-[800px] mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Zero Judgment. Zero Jargon.<br />Just Support.
          </h2>
          <p className="text-teal-50 text-lg max-w-[600px]">
            Join a community that understands your journey.
          </p>
          <Button href="/resources" size="lg" className="!bg-white !text-teal-primary hover:!bg-gray-50 mt-4">
            Explore Resources
          </Button>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-gray-900 text-3xl font-bold text-center mb-12">What We Don&apos;t Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {disclaimers.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                <div className="bg-red-100 text-red-600 rounded-full p-1 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-peach-start py-24 px-6 text-center">
        <div className="max-w-[600px] mx-auto flex flex-col gap-6 items-center">
          <h2 className="text-gray-900 text-4xl font-black tracking-tight">
            Join thousands on the same path
          </h2>
          <p className="text-gray-600 text-lg">
            Start your journey with clear guidance and a supportive community today.
          </p>
          <Button href="/get-started" size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}

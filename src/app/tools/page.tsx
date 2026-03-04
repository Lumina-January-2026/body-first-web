import type { Metadata } from 'next';
import Badge from '@/components/common/Badge';

export const metadata: Metadata = {
  title: 'GLP-1 Planning Tools',
  description: 'Interactive tools to help you plan your GLP-1 journey — BMI calculator, cost estimator, and more.',
};

const tools = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'BMI Calculator',
    description:
      'Quickly check your BMI and understand what it means for GLP-1 eligibility. Remember, BMI is just one factor your doctor will consider.',
    color: 'bg-teal-50 text-teal-primary',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Cost Estimator',
    description:
      'Estimate your monthly costs with different GLP-1 medications, including savings cards and insurance coverage.',
    color: 'bg-orange-50 text-coral',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
      </svg>
    ),
    title: 'Medication Comparison',
    description:
      'Compare GLP-1 medications side by side — dosing, mechanism, cost, and what to discuss with your doctor.',
    color: 'bg-blue-50 text-blue-600',
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Tools</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Interactive tools to help you plan and prepare. We&apos;re building these
            right now — check back soon.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.title} className="bg-white rounded-2xl shadow-card p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center`}>
                  {tool.icon}
                </div>
                <Badge variant="gray">Coming Soon</Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

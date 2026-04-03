export default function GuidelinesCard() {
  const rules = [
    {
      title: 'Be Kind & Supportive',
      description: 'Every person here is on their own journey. Treat others with compassion and respect.',
    },
    {
      title: 'Protect Privacy',
      description: "Keep the community anonymous. Don't share personal information or outside contact details.",
    },
    {
      title: 'Stay On Topic',
      description: 'Focus on wellness and GLP-1 journeys. No promotion of outside services.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="font-bold text-gray-900 mb-4">Community Guidelines</h3>
      <p className="text-gray-400 text-xs leading-relaxed mb-4">
        This is a supportive space for people researching GLP-1 medications. Some posts are shared by the Body First team to help get conversations started. Be kind, share experiences (not medical advice), and report anything that makes you uncomfortable.
      </p>
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.title}>
            <p className="font-semibold text-gray-800 text-sm">{rule.title}</p>
            <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

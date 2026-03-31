'use client';

export default function Guides() {
  const guides = [
    {
      title: 'First Time Home Buyer Guide',
      description: 'Everything you need to know about purchasing your first home.',
      topics: ['Pre-approval', 'Finding neighborhoods', 'Making offers', 'Inspections']
    },
    {
      title: 'Investment Property Guide',
      description: 'Strategies for building wealth through real estate investments.',
      topics: ['Market analysis', 'Cash flow', 'Tax benefits', 'Exit strategies']
    },
    {
      title: 'Luxury Property Buying',
      description: 'Navigate the high-end real estate market with confidence.',
      topics: ['Due diligence', 'Negotiations', 'Hidden costs', 'Escrow']
    },
    {
      title: 'Relocation Guide',
      description: 'Move to a new city with our comprehensive relocation resources.',
      topics: ['Market overview', 'Schools', 'Neighborhoods', 'Moving tips']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Buying Guides</h1>
          <p className="text-xl text-[#E7D8C2]">Expert resources to help you make informed real estate decisions.</p>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, idx) => (
              <div key={idx} className="lux-card p-8 hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-[#C9A96A] mb-3">{guide.title}</h3>
                <p className="text-[#5F5448] mb-6">{guide.description}</p>
                <div>
                  <p className="text-sm font-semibold text-[#1C1A17] mb-3">Topics Covered:</p>
                  <ul className="space-y-2">
                    {guide.topics.map((topic, i) => (
                      <li key={i} className="flex items-center text-[#5F5448]">
                        <span className="w-2 h-2 bg-[#C9A96A] rounded-full mr-3"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="lux-button mt-6 w-full">Read Guide</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

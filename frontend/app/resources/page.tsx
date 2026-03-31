'use client';

export default function Resources() {
  const resources = [
    {
      category: 'Tools',
      items: [
        { title: 'Mortgage Calculator', desc: 'Calculate monthly payments and total loan costs' },
        { title: 'Home Value Estimator', desc: 'Get instant estimates for property values' },
        { title: 'Rent vs. Buy Calculator', desc: 'Compare the financial benefits of renting vs buying' }
      ]
    },
    {
      category: 'Articles',
      items: [
        { title: 'Current Market Trends', desc: 'Analysis of today\'s real estate market' },
        { title: 'Tax Deductions for Owners', desc: 'Maximize your tax benefits as a property owner' },
        { title: 'Investment Strategies', desc: 'Build wealth through smart real estate investing' }
      ]
    },
    {
      category: 'Educational',
      items: [
        { title: 'Real Estate Glossary', desc: 'Understand common terms and acronyms' },
        { title: 'Legal Processes', desc: 'Learn about escrow, inspections, and closings' },
        { title: 'Financing Options', desc: 'Explore different mortgage and financing options' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Resources</h1>
          <p className="text-xl text-[#E7D8C2]">Tools, guides, and information to support your real estate journey.</p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {resources.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="text-3xl font-bold text-[#C9A96A] mb-8">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {section.items.map((item, i) => (
                  <div key={i} className="lux-card p-6 hover:shadow-lg transition cursor-pointer">
                    <h3 className="text-lg font-semibold text-[#1C1A17] mb-2">{item.title}</h3>
                    <p className="text-[#5F5448] mb-4">{item.desc}</p>
                    <button className="text-[#C9A96A] font-semibold hover:text-[#D4B577] transition">
                      Learn More →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-[#15120D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#C9A96A] mb-4">Stay Updated</h2>
          <p className="text-[#E7D8C2] mb-6">Subscribe to our newsletter for the latest market insights and tips.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="lux-input flex-grow"
            />
            <button className="lux-button px-6">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

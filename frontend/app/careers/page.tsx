'use client';

export default function Careers() {
  const positions = [
    {
      title: 'Senior Real Estate Agent',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Join our team and help clients find their dream properties.'
    },
    {
      title: 'Property Manager',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Manage residential and commercial properties for our clients.'
    },
    {
      title: 'Marketing Specialist',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create compelling content to showcase luxury properties.'
    },
    {
      title: 'Client Relationship Manager',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Build and maintain relationships with our valued clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Join Our Team</h1>
          <p className="text-xl text-[#E7D8C2]">Be part of a luxury real estate platform transforming the industry.</p>
        </div>
      </section>

      {/* Careers Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1C1A17]">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="lux-card p-6">
                <h3 className="text-xl font-semibold text-[#C9A96A] mb-2">Competitive Compensation</h3>
                <p className="text-[#5F5448]">Industry-leading salaries and performance bonuses.</p>
              </div>
              <div className="lux-card p-6">
                <h3 className="text-xl font-semibold text-[#C9A96A] mb-2">Growth Opportunities</h3>
                <p className="text-[#5F5448]">Clear career advancement paths and professional development.</p>
              </div>
              <div className="lux-card p-6">
                <h3 className="text-xl font-semibold text-[#C9A96A] mb-2">Team Culture</h3>
                <p className="text-[#5F5448]">Collaborative, supportive environment with industry experts.</p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#1C1A17]">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, idx) => (
                <div key={idx} className="lux-card p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#C9A96A]">{position.title}</h3>
                    <span className="text-sm bg-[#C9A96A] text-white px-3 py-1 rounded">{position.type}</span>
                  </div>
                  <p className="text-[#5F5448] mb-2">{position.location}</p>
                  <p className="text-[#5F5448]">{position.description}</p>
                  <button className="lux-button mt-4">Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

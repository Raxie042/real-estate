'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lux-card p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96A] mb-3">About</p>
          <h1 className="text-4xl font-semibold mb-6">About Raxie Zenith Estate</h1>
          
          <div className="space-y-6 text-[#5F5448]">
            <p className="text-lg">
              Raxie Zenith Estate is a leading global real estate platform connecting buyers, sellers, and agents worldwide.
            </p>
            
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p>
                To revolutionize the real estate industry by making property buying, selling, and renting seamless, transparent, and accessible to everyone worldwide.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Browse millions of properties worldwide</li>
                <li>Advanced search and filtering options</li>
                <li>Connect with verified real estate agents</li>
                <li>Secure messaging and scheduling</li>
                <li>Real-time notifications for new listings</li>
                <li>Comprehensive property information and analytics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                Have questions? We&apos;re here to help!<br />
                Email: support@raxiezenithestate.com<br />
                Phone: +1-555-REAL-ESTATE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

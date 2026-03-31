'use client';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Privacy Policy</h1>
          <p className="text-[#E7D8C2]">Last updated: February 11, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto lux-card p-8 space-y-6 text-[#5F5448]">
          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Introduction</h2>
            <p>
              Raxie Zenith Estate (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;) operates the website and mobile applications. 
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you 
              use our Service and the choices you have associated with that data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Information Collection and Use</h2>
            <p className="mb-3">We collect several different types of information for various purposes to provide and improve our Service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Personal Data: Name, email address, phone number, address</li>
              <li>Usage Data: Browser type, IP address, pages visited, time spent</li>
              <li>Cookies and Tracking: Device information, browsing patterns</li>
              <li>Property Information: Listings, preferences, search history</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Use of Data</h2>
            <p className="mb-3">We use the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information for service improvement</li>
              <li>To monitor the usage of our Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or 
              method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your 
              Personal Data, we cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
              Policy on this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: 
              <br />
              <strong>Email:</strong> privacy@raxiezenithestate.com
              <br />
              <strong>Address:</strong> 123 Luxury Avenue, New York, NY 10001
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

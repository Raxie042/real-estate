'use client';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Cookie Policy</h1>
          <p className="text-[#E7D8C2]">Last updated: February 11, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto lux-card p-8 space-y-6 text-[#5F5448]">
          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">What are Cookies?</h2>
            <p>
              Cookies are small files of letters and numbers that we store on your browser or the hard drive of your computer 
              if you agree. Cookies contain information that is transferred to your computer&apos;s hard drive. They help us to improve 
              our website and to deliver a better and more personalized service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Why Do We Use Cookies?</h2>
            <p className="mb-3">We use cookies for several reasons:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To recognize you when you return to our website</li>
              <li>To customize content and advertisements based on your preferences</li>
              <li>To improve the functionality of our website</li>
              <li>To understand how our website is used by visitors</li>
              <li>To enable essential features like login and security</li>
              <li>To remember your preferences and settings</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1C1A17] mb-2">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function properly and cannot be turned off.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1A17] mb-2">Performance Cookies</h3>
                <p>These cookies help us understand how visitors interact with our website to improve its performance.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1A17] mb-2">Functional Cookies</h3>
                <p>These cookies allow us to remember your choices and provide enhanced features.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1A17] mb-2">Targeting Cookies</h3>
                <p>These cookies are used to deliver personalized advertisements and content.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may use various third-party cookies to report usage statistics of the Service, 
              deliver advertisements on and off the Service, and so on. These third parties may use cookies to track your activity 
              on our website and other websites.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Managing Cookies</h2>
            <p className="mb-3">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device 
              and set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust 
              some preferences every time you visit a website and some services may not work as intended.
            </p>
            <p>To manage cookies, please refer to your browser&apos;s settings. Most browsers have instructions on how to do this.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
              legal, or regulatory reasons. We will notify you of any material changes by updating the &quot;effective date&quot; of this 
              Cookie Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, please contact us at: 
              <br />
              <strong>Email:</strong> privacy@raxiezenithestate.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

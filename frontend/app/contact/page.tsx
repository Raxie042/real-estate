'use client';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Get in Touch</h1>
          <p className="text-xl text-[#E7D8C2]">We&apos;re here to help with any questions about buying, selling, or renting properties.</p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="lux-form">
            <h2 className="text-3xl font-bold mb-6 text-[#1C1A17]">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-2">Name</label>
                <input type="text" className="lux-input w-full" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-2">Email</label>
                <input type="email" className="lux-input w-full" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-2">Subject</label>
                <input type="text" className="lux-input w-full" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-2">Message</label>
                <textarea className="lux-input w-full h-32 resize-none" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="lux-button w-full">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#1C1A17]">Contact Information</h2>
            <div className="space-y-6">
              <div className="lux-card p-6">
                <h3 className="text-lg font-semibold text-[#C9A96A] mb-2">Phone</h3>
                <p className="text-[#5F5448]">+1 (555) 123-4567</p>
                <p className="text-[#5F5448]">Available: Mon-Fri, 9AM-6PM EST</p>
              </div>
              <div className="lux-card p-6">
                <h3 className="text-lg font-semibold text-[#C9A96A] mb-2">Email</h3>
                <p className="text-[#5F5448]">support@raxiezenithestate.com</p>
                <p className="text-[#5F5448]">sales@raxiezenithestate.com</p>
              </div>
              <div className="lux-card p-6">
                <h3 className="text-lg font-semibold text-[#C9A96A] mb-2">Office</h3>
                <p className="text-[#5F5448]">123 Luxury Avenue</p>
                <p className="text-[#5F5448]">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

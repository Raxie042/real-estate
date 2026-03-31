'use client';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Terms of Service</h1>
          <p className="text-[#E7D8C2]">Last updated: February 11, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto lux-card p-8 space-y-6 text-[#5F5448]">
          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website and mobile application, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">2. Use License</h2>
            <p className="mb-3">Permission is granted to temporarily download one copy of the materials (information or software) 
            on Raxie Zenith Estate&apos;s website for personal, non-commercial transitory viewing only. This is the grant of 
            a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the website</li>
              <li>Removing any copyright or proprietary notations from the materials</li>
              <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">3. Disclaimer</h2>
            <p>
              The materials on Raxie Zenith Estate&apos;s website are provided &quot;as is&quot;. Raxie Zenith Estate makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">4. Limitations</h2>
            <p>
              In no event shall Raxie Zenith Estate or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
              on Raxie Zenith Estate&apos;s website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Raxie Zenith Estate&apos;s website could include technical, typographical, or photographic errors. 
              Raxie Zenith Estate does not warrant that any of the materials on its website are accurate, complete, or current. 
              Raxie Zenith Estate may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">6. Links</h2>
            <p>
              Raxie Zenith Estate has not reviewed all of the sites linked to its website and is not responsible for the contents of any 
              such linked site. The inclusion of any link does not imply endorsement by Raxie Zenith Estate of the site. Use of any such 
              linked website is at the user&apos;s own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">7. Modifications</h2>
            <p>
              Raxie Zenith Estate may revise these terms of service for its website at any time without notice. By using this website, 
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#C9A96A] mb-3">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at: 
              <br />
              <strong>Email:</strong> legal@raxiezenithestate.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

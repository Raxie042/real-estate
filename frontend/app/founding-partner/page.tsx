import Link from 'next/link';

export default function FoundingPartnerPage() {
  return (
    <div className="min-h-screen bg-[#15120D] text-[#F4EFE8] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full mx-auto py-20">
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-center tracking-tight text-[#C9A96A]">
          Founding Partner Opportunity
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center text-[#D9CBB7]">
          We are inviting a select group of visionary partners to help shape the future of luxury real estate in Prime Central London. This is a rare, limited opportunity to join the platform at its inception and secure a permanent place at the top.
        </p>
        <div className="bg-[#1C1A17] rounded-xl p-8 mb-8 shadow-lg">
          <ul className="space-y-4 text-lg">
            <li>✔️ Exclusive access to the platform’s first listings</li>
            <li>✔️ Priority branding and placement</li>
            <li>✔️ Direct input into product direction</li>
            <li>✔️ Lifetime recognition as a Founding Partner</li>
            <li>✔️ Private preview events and networking</li>
          </ul>
        </div>
        <div className="text-center mb-8">
          <a href="mailto:founders@raxiezenithestate.com" className="lux-button text-lg px-8 py-4">Request Invitation</a>
        </div>
        <p className="text-center text-[#7A6E60] text-sm">
          For a confidential conversation, contact us at <a href="mailto:founders@raxiezenithestate.com" className="underline">founders@raxiezenithestate.com</a>
        </p>
        <div className="mt-12 text-center">
          <Link href="/" className="text-[#C9A96A] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

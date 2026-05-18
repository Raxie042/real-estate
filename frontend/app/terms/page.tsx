'use client';

import Link from 'next/link';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-10 scroll-mt-8">
      <h2 className="text-xl font-bold text-[#1C1A17] mb-4 pb-2 border-b border-[#E8E1D7]">{title}</h2>
      <div className="space-y-3 text-[#5F5448] leading-relaxed text-[15px]">{children}</div>
    </div>
  );
}

const SECTIONS = [
  { id: 'agreement', title: '1. Agreement to These Terms' },
  { id: 'who-we-are', title: '2. Who We Are' },
  { id: 'eligibility', title: '3. Eligibility' },
  { id: 'account', title: '4. Account Registration & Security' },
  { id: 'permitted-use', title: '5. Permitted Use' },
  { id: 'prohibited', title: '6. Prohibited Conduct' },
  { id: 'listings', title: '7. Property Listings & Content Standards' },
  { id: 'financial', title: '8. Financial Tools & Information Disclaimer' },
  { id: 'agency', title: '9. Real Estate Agency Disclaimer' },
  { id: 'user-content', title: '10. User-Submitted Content' },
  { id: 'ip', title: '11. Intellectual Property' },
  { id: 'subscriptions', title: '12. Subscriptions, Fees & Payments' },
  { id: 'termination', title: '13. Termination & Consequences of Breach' },
  { id: 'disclaimers', title: '14. Disclaimers & Limitation of Liability' },
  { id: 'indemnification', title: '15. Indemnification' },
  { id: 'aml', title: '16. Anti-Money Laundering Obligations' },
  { id: 'third-party', title: '17. Third-Party Services & Links' },
  { id: 'governing-law', title: '18. Governing Law & Jurisdiction' },
  { id: 'disputes', title: '19. Dispute Resolution' },
  { id: 'changes', title: '20. Changes to These Terms' },
  { id: 'contact', title: '21. Contact Us' },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <section className="bg-[#1C1A17] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Legal</p>
          <h1 className="text-5xl font-light text-white mb-4">Terms of Service</h1>
          <p className="text-[#B9AA98]">Last updated: 18 May 2026 &nbsp;·&nbsp; Governed by the laws of England & Wales</p>
          <p className="text-[#B9AA98] mt-2 text-sm max-w-2xl">Please read these terms carefully before using the Raxie Zenith Estate platform. By accessing or using our service in any way, you agree to be bound by these terms in full.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 bg-white rounded-2xl border border-[#E8E1D7] p-5">
            <p className="text-xs uppercase tracking-widest text-[#C9A96A] mb-4">Contents</p>
            <nav className="space-y-1">
              {SECTIONS.map(s => (
                <a key={s.id} href={`#${s.id}`} className="block text-xs text-[#7A6E60] hover:text-[#C9A96A] py-0.5 leading-snug transition-colors">{s.title}</a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main body */}
        <main className="lg:col-span-3 bg-white rounded-2xl border border-[#E8E1D7] p-8 md:p-10">

          <Section id="agreement" title="1. Agreement to These Terms">
            <p>These Terms of Service (&ldquo;Terms&rdquo;) are a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and Raxie Zenith Estate Ltd (&ldquo;Raxie&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) governing your access to and use of <strong>www.raxiezenithestate.com</strong>, our mobile applications, and all related services (the &ldquo;Platform&rdquo;).</p>
            <p>By accessing, browsing, registering, or using the Platform in any way, you confirm you have read, understood, and agree to be bound by these Terms, our <Link href="/privacy" className="text-[#C9A96A] underline">Privacy Policy</Link>, <Link href="/cookies" className="text-[#C9A96A] underline">Cookie Policy</Link>, and all policies incorporated herein.</p>
            <p className="font-semibold text-[#1C1A17]">If you do not agree to these Terms, you must not access or use the Platform.</p>
          </Section>

          <Section id="who-we-are" title="2. Who We Are">
            <p>Raxie Zenith Estate Ltd is a private limited company incorporated in England and Wales. Our registered office is: <strong>1 Mayfair Court, London, W1K 2AB, United Kingdom</strong>.</p>
            <p>We operate a luxury property portal providing property search and discovery, listing management, valuation tools, investment research, concierge services, and financial information resources.</p>
            <p>We are registered with the <strong>Information Commissioner&apos;s Office (ICO)</strong> under the UK GDPR and Data Protection Act 2018. For estate agency activity, we are registered with <strong>HMRC as an AML-supervised business</strong> under the Money Laundering Regulations 2017.</p>
          </Section>

          <Section id="eligibility" title="3. Eligibility">
            <p>You must be at least <strong>18 years of age</strong> to use the Platform. By using it you represent that:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>You are at least 18 years old and have legal capacity to enter a binding agreement;</li>
              <li>You are not prohibited from using the Platform under any applicable law;</li>
              <li>All information you provide is accurate, current, and complete.</li>
            </ul>
            <p>If you use the Platform on behalf of a company or legal entity, you represent that you have authority to bind that entity to these Terms.</p>
          </Section>

          <Section id="account" title="4. Account Registration & Security">
            <p>Certain features require account registration. You agree to provide accurate information and to maintain your credentials securely. You must:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Use a strong, unique password (minimum 8 characters, mixed case, number, symbol);</li>
              <li>Never share your login credentials with any third party;</li>
              <li>Log out of shared or public devices after each session;</li>
              <li>Notify us immediately at <strong>security@raxiezenithestate.com</strong> if you suspect unauthorised access.</li>
            </ul>
            <p>We will never ask for your password by email or phone. We may require identity verification before granting access to private listings, the Private Office, or high-value transaction tools. We reserve the right to disable any account that poses a security risk or has breached these Terms.</p>
          </Section>

          <Section id="permitted-use" title="5. Permitted Use">
            <p>We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform solely for:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Searching for, viewing, and enquiring about residential and commercial properties;</li>
              <li>Listing your own property (or a property you are authorised to list);</li>
              <li>Accessing market research, guides, and calculators for personal, non-commercial use;</li>
              <li>Communicating with agents, sellers, or buyers through our messaging features;</li>
              <li>Managing your account, saved searches, and subscribed services.</li>
            </ul>
          </Section>

          <Section id="prohibited" title="6. Prohibited Conduct">
            <p>You agree that you will <strong>not</strong> under any circumstances:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Use the Platform for any unlawful purpose or in violation of any applicable law;</li>
              <li>Submit false, misleading, or fraudulent property listings or information;</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity;</li>
              <li>Scrape, crawl, harvest, or systematically extract data from the Platform by automated means without written consent;</li>
              <li>Use any robot, bot, or automated device to access or interact with the Platform;</li>
              <li>Attempt to bypass, circumvent, or break any security or access control mechanism;</li>
              <li>Upload or transmit malware, viruses, ransomware, or any malicious code;</li>
              <li>Conduct denial-of-service (DoS) or distributed denial-of-service (DDoS) attacks;</li>
              <li>Access another user&apos;s account, data, or communications without authorisation;</li>
              <li>Transmit unsolicited commercial communications (spam) through the Platform;</li>
              <li>Harass, threaten, stalk, or abuse any other user;</li>
              <li>Post content that is defamatory, obscene, or promotes unlawful discrimination;</li>
              <li>Use Platform content for competitive intelligence or to populate a competing service;</li>
              <li>Reproduce or commercially exploit any part of the Platform&apos;s content without written permission;</li>
              <li>Remove or alter any copyright notice, trademark, or proprietary notice on the Platform;</li>
              <li>Use the Platform to facilitate money laundering, fraud, or any financial crime;</li>
              <li>Transact with sanctioned individuals or entities under UK, EU, or US sanctions regimes;</li>
              <li>Create multiple accounts to circumvent bans or restrictions.</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
              <strong>Consequences:</strong> Breach of this section may result in immediate account suspension or termination, removal of all content, civil legal action, and referral to law enforcement where criminal conduct is involved.
            </div>
          </Section>

          <Section id="listings" title="7. Property Listings & Content Standards">
            <p>By submitting a property listing you represent and warrant that:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>You are the legal owner, authorised agent, or have express written permission from the owner;</li>
              <li>All information — price, size, description, photographs — is accurate and not misleading;</li>
              <li>The property exists at the stated address and is genuinely available;</li>
              <li>All photographs submitted are owned by you or properly licensed, and do not infringe third-party rights;</li>
              <li>You will update or remove the listing promptly if the property is sold, let, or withdrawn;</li>
              <li>The listing does not unlawfully discriminate under the Equality Act 2010.</li>
            </ul>
            <p>We reserve the right to review, edit, remove, or refuse any listing at our sole discretion without prior notice.</p>
          </Section>

          <Section id="financial" title="8. Financial Tools & Information Disclaimer">
            <p>Financial tools on the Platform (stamp duty calculator, mortgage calculator, rental yield calculator, currency converter, tax guides) are provided for <strong>general informational and indicative purposes only</strong>.</p>
            <p><strong>They do not constitute financial advice, tax advice, legal advice, or any form of regulated advice.</strong> You should always seek independent professional advice from a qualified financial adviser, solicitor, or tax specialist before making any financial commitment.</p>
            <p>Raxie Zenith Estate Ltd is not regulated by the Financial Conduct Authority (FCA) for investment or mortgage advice. Mortgage and financing products referenced on the Platform are provided by regulated third parties subject to their own terms.</p>
          </Section>

          <Section id="agency" title="9. Real Estate Agency Disclaimer">
            <p>Unless explicitly stated in a separate written instruction letter, Raxie Zenith Estate operates as a property marketing platform only. We:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Do not act as your agent in any transaction;</li>
              <li>Do not negotiate on your behalf;</li>
              <li>Do not hold client money or deposits;</li>
              <li>Do not guarantee the accuracy of agent representations made through the Platform.</li>
            </ul>
            <p>Automated property valuations are estimates only and should not be relied upon as formal valuations.</p>
          </Section>

          <Section id="user-content" title="10. User-Submitted Content">
            <p>By submitting any content (listings, photographs, reviews, messages) you grant Raxie Zenith Estate a <strong>non-exclusive, worldwide, royalty-free, sublicensable licence</strong> to use, reproduce, publish, and display that content in connection with operating and promoting the Platform.</p>
            <p>You retain ownership of your content but confirm that: it does not infringe any third-party rights; it is not false or defamatory; and you have the right to grant this licence. We may remove any user content at any time without notice if it violates these Terms.</p>
          </Section>

          <Section id="ip" title="11. Intellectual Property">
            <p>The Platform and all its content — including the Raxie Zenith Estate name and logo, software, source code, design, editorial content, market data compilations, and databases — are owned by or licensed to Raxie Zenith Estate Ltd and protected by copyright, trademark, database rights, and other IP laws.</p>
            <p>You may not: copy or distribute Platform content without written permission; modify or create derivative works from the Platform; use our brand name or logo without written authorisation; or reverse-engineer any software.</p>
            <p>For copyright complaints, see our <Link href="/copyright" className="text-[#C9A96A] underline">Copyright & Intellectual Property Policy</Link>.</p>
          </Section>

          <Section id="subscriptions" title="12. Subscriptions, Fees & Payments">
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li><strong>Pricing:</strong> All prices are in GBP (£) inclusive of VAT. We reserve the right to change pricing with 30 days&apos; notice to active subscribers.</li>
              <li><strong>Renewals:</strong> Subscriptions renew automatically unless cancelled before the renewal date.</li>
              <li><strong>Cancellation:</strong> Cancel at any time via your Account dashboard. Cancellation takes effect at the end of the current billing period. No partial refunds for unused time.</li>
              <li><strong>Refunds:</strong> Subject to your statutory rights under UK consumer law, fees are generally non-refundable. Contact <strong>billing@raxiezenithestate.com</strong> within 14 days for billing errors.</li>
              <li><strong>Free Trials:</strong> Your payment method will be charged automatically at the end of the trial period unless you cancel beforehand.</li>
              <li><strong>Failed Payments:</strong> Continued non-payment may result in suspension or termination of your subscription.</li>
            </ul>
          </Section>

          <Section id="termination" title="13. Termination & Consequences of Breach">
            <p>We may suspend, restrict, or permanently terminate your access at any time with or without prior notice if you breach these Terms, if we suspect fraudulent or illegal activity, if required by a law enforcement authority, or if continued use poses a security risk.</p>
            <p>Upon termination, your right to access the Platform immediately ceases. Data will be handled per our <Link href="/privacy" className="text-[#C9A96A] underline">Privacy Policy</Link>. Sections 11, 14, 15, 16, and 18 survive termination.</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Legal Action:</strong> Where a breach involves fraudulent listings, identity fraud, money laundering, or data theft, we will report the matter to Action Fraud, the NCA, or the ICO, and may pursue civil claims for damages or injunctive relief.
            </div>
          </Section>

          <Section id="disclaimers" title="14. Disclaimers & Limitation of Liability">
            <p>The Platform is provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> basis. To the fullest extent permitted by law, we disclaim all warranties — express or implied — including merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p>Our total aggregate liability to you for any claim shall not exceed the greater of: (a) fees paid by you in the 12 months preceding the claim, or (b) <strong>£500</strong>. We are not liable for any indirect, incidental, special, or consequential losses.</p>
            <p>Nothing herein excludes liability for death or personal injury caused by our negligence, fraud, or any liability that cannot be excluded under English law.</p>
          </Section>

          <Section id="indemnification" title="15. Indemnification">
            <p>You agree to indemnify, defend, and hold harmless Raxie Zenith Estate Ltd and its officers, employees, and contractors against any claims, losses, damages, and legal fees arising from: your use of the Platform; your submitted content; your violation of these Terms; or your violation of any third-party rights.</p>
          </Section>

          <Section id="aml" title="16. Anti-Money Laundering Obligations">
            <p>We are subject to the <strong>Money Laundering Regulations 2017</strong> and supervised by <strong>HMRC</strong> for AML compliance. You acknowledge and agree that:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>We are legally required to carry out <strong>Customer Due Diligence (CDD)</strong> before transacting, including identity and source-of-funds verification;</li>
              <li>You will promptly provide any documentation we request under our AML procedures;</li>
              <li>We are required to file a <strong>Suspicious Activity Report (SAR)</strong> with the NCA if we suspect criminal funds — and are prohibited by law from telling you (&ldquo;tipping off&rdquo;);</li>
              <li>We may delay or decline any transaction pending AML checks, with no liability for doing so in good faith.</li>
            </ul>
            <p>For our full policy, see <Link href="/aml" className="text-[#C9A96A] underline">Anti-Money Laundering Policy</Link>.</p>
          </Section>

          <Section id="third-party" title="17. Third-Party Services & Links">
            <p>The Platform may link to third-party websites or services (mortgage providers, payment processors, legal services). These are subject to their own terms and privacy policies. We do not endorse or accept responsibility for any third-party service. Use of third-party services is at your own risk.</p>
          </Section>

          <Section id="governing-law" title="18. Governing Law & Jurisdiction">
            <p>These Terms and any dispute arising from them shall be governed by the law of <strong>England and Wales</strong>. The courts of England and Wales shall have exclusive jurisdiction, subject to Section 19. Consumers in Scotland, Northern Ireland, or EU/EEA member states may also have the right to bring proceedings in their home courts.</p>
          </Section>

          <Section id="disputes" title="19. Dispute Resolution">
            <p>In the event of a dispute, contact us first at <strong>legal@raxiezenithestate.com</strong>. We will respond within 10 business days. If unresolved, disputes shall be referred to arbitration under <strong>CIArb</strong> rules before litigation, save for applications for urgent injunctive relief.</p>
            <p>EU consumers may also use the <a href="https://ec.europa.eu/consumers/odr" className="text-[#C9A96A] underline" target="_blank" rel="noopener noreferrer">EU Online Dispute Resolution platform</a>.</p>
          </Section>

          <Section id="changes" title="20. Changes to These Terms">
            <p>We may amend these Terms at any time. Material changes will be notified by updating the &ldquo;Last updated&rdquo; date, posting a notice on the Platform, and emailing registered users. Continued use after the effective date constitutes acceptance of the revised Terms.</p>
          </Section>

          <Section id="contact" title="21. Contact Us">
            <div className="bg-[#F6F2EC] rounded-xl p-5 space-y-1.5 text-sm">
              <p><strong>Raxie Zenith Estate Ltd</strong></p>
              <p>1 Mayfair Court, London, W1K 2AB, United Kingdom</p>
              <p><strong>General legal:</strong> <a href="mailto:legal@raxiezenithestate.com" className="text-[#C9A96A]">legal@raxiezenithestate.com</a></p>
              <p><strong>Privacy / Data:</strong> <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a></p>
              <p><strong>AML / Compliance:</strong> <a href="mailto:compliance@raxiezenithestate.com" className="text-[#C9A96A]">compliance@raxiezenithestate.com</a></p>
              <p><strong>Security:</strong> <a href="mailto:security@raxiezenithestate.com" className="text-[#C9A96A]">security@raxiezenithestate.com</a></p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {[['Privacy Policy','/privacy'],['Cookie Policy','/cookies'],['Security Policy','/security'],['Copyright & IP','/copyright'],['AML Policy','/aml']].map(([l,h]) => (
                <Link key={h} href={h} className="text-[#C9A96A] underline">{l}</Link>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

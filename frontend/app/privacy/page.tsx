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

const TOC = [
  { id: 'controller', title: '1. Who We Are (Data Controller)' },
  { id: 'data-collected', title: '2. Data We Collect' },
  { id: 'how-collected', title: '3. How We Collect Your Data' },
  { id: 'legal-basis', title: '4. Legal Basis for Processing' },
  { id: 'how-used', title: '5. How We Use Your Data' },
  { id: 'sharing', title: '6. Who We Share Your Data With' },
  { id: 'transfers', title: '7. International Transfers' },
  { id: 'retention', title: '8. Data Retention' },
  { id: 'rights', title: '9. Your Rights Under UK GDPR' },
  { id: 'ico', title: '10. Right to Complain to the ICO' },
  { id: 'security', title: '11. How We Protect Your Data' },
  { id: 'automated', title: '12. Automated Decision-Making' },
  { id: 'children', title: '13. Children' },
  { id: 'marketing', title: '14. Marketing & Communications' },
  { id: 'third-party-links', title: '15. Third-Party Links' },
  { id: 'changes', title: '16. Changes to This Policy' },
  { id: 'contact', title: '17. Contact & DPO' },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <section className="bg-[#1C1A17] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Legal</p>
          <h1 className="text-5xl font-light text-white mb-4">Privacy Policy</h1>
          <p className="text-[#B9AA98]">Last updated: 18 May 2026 &nbsp;·&nbsp; UK GDPR & Data Protection Act 2018</p>
          <p className="text-[#B9AA98] mt-2 text-sm max-w-2xl">This policy explains how Raxie Zenith Estate Ltd collects, uses, stores, and protects your personal data. We are committed to protecting your privacy and processing your data lawfully, fairly, and transparently.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-8 bg-white rounded-2xl border border-[#E8E1D7] p-5">
            <p className="text-xs uppercase tracking-widest text-[#C9A96A] mb-4">Contents</p>
            <nav className="space-y-1">
              {TOC.map(s => (
                <a key={s.id} href={`#${s.id}`} className="block text-xs text-[#7A6E60] hover:text-[#C9A96A] py-0.5 leading-snug transition-colors">{s.title}</a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-3 bg-white rounded-2xl border border-[#E8E1D7] p-8 md:p-10">

          <Section id="controller" title="1. Who We Are (Data Controller)">
            <p>Raxie Zenith Estate Ltd (&ldquo;Raxie&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is the <strong>Data Controller</strong> for personal data collected through this Platform under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
            <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm space-y-1">
              <p><strong>Registered address:</strong> 1 Mayfair Court, London, W1K 2AB, United Kingdom</p>
              <p><strong>ICO Registration Number:</strong> [TBC]</p>
              <p><strong>Data Protection contact:</strong> <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a></p>
            </div>
          </Section>

          <Section id="data-collected" title="2. Data We Collect">
            <p><strong>Identity & Contact Data</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Name, title, date of birth</li>
              <li>Email address, phone number, postal address</li>
              <li>Government-issued identity documents (where required for AML verification)</li>
            </ul>
            <p className="pt-1"><strong>Account & Profile Data</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Username, encrypted password, account preferences</li>
              <li>Saved searches, favourited properties, comparison lists</li>
              <li>Professional details (for agents and agencies)</li>
            </ul>
            <p className="pt-1"><strong>Property & Transaction Data</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Property listings you create or enquire about</li>
              <li>Offer submissions, rental applications, valuation requests</li>
              <li>Source-of-funds declarations (for high-value transactions)</li>
            </ul>
            <p className="pt-1"><strong>Financial Data</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Billing information (processed by our payment provider — we do not store full card numbers)</li>
              <li>Subscription tier and payment history</li>
            </ul>
            <p className="pt-1"><strong>Technical & Usage Data</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>IP address, browser type and version, operating system</li>
              <li>Pages visited, time on page, search queries, click paths</li>
              <li>Device identifiers, session tokens</li>
            </ul>
            <p className="pt-1"><strong>Communications Data</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Messages sent via our platform between buyers, sellers, and agents</li>
              <li>Support queries and correspondence</li>
            </ul>
          </Section>

          <Section id="how-collected" title="3. How We Collect Your Data">
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li><strong>Directly from you:</strong> when you register, list a property, make an enquiry, submit a form, or contact us;</li>
              <li><strong>Automated technologies:</strong> cookies, web beacons, and server logs collect technical and usage data as you browse;</li>
              <li><strong>Third parties:</strong> identity verification providers, credit reference agencies (where applicable), social login providers (Google, Apple), marketing analytics platforms.</li>
            </ul>
          </Section>

          <Section id="legal-basis" title="4. Legal Basis for Processing (UK GDPR Article 6)">
            <p>We process your personal data under the following lawful bases:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-1">
                <thead>
                  <tr className="bg-[#F6F2EC]">
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Purpose</th>
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Creating and managing your account','Contract (Art. 6(1)(b))'],
                    ['Processing your property listings and enquiries','Contract (Art. 6(1)(b))'],
                    ['Processing payments','Contract (Art. 6(1)(b))'],
                    ['Sending service notifications and updates','Contract (Art. 6(1)(b))'],
                    ['Improving the Platform through analytics','Legitimate Interest (Art. 6(1)(f))'],
                    ['Fraud prevention and security monitoring','Legitimate Interest (Art. 6(1)(f))'],
                    ['Marketing communications (where opted in)','Consent (Art. 6(1)(a))'],
                    ['AML / identity verification','Legal Obligation (Art. 6(1)(c))'],
                    ['Responding to law enforcement requests','Legal Obligation (Art. 6(1)(c))'],
                  ].map(([p, b]) => (
                    <tr key={p} className="border-b border-[#E8E1D7]">
                      <td className="p-2 border border-[#E8E1D7]">{p}</td>
                      <td className="p-2 border border-[#E8E1D7] whitespace-nowrap">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="how-used" title="5. How We Use Your Data">
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>To create, maintain, and manage your account;</li>
              <li>To publish, promote, and manage your property listings;</li>
              <li>To facilitate connections between buyers, sellers, landlords, and agents;</li>
              <li>To process subscription payments and send invoices;</li>
              <li>To send you service notifications, policy updates, and security alerts;</li>
              <li>To personalise your experience (saved searches, recommended properties);</li>
              <li>To conduct property valuations and investment analysis;</li>
              <li>To detect, investigate, and prevent fraud, abuse, or illegal activity;</li>
              <li>To comply with our legal obligations including AML regulations;</li>
              <li>To improve the Platform through aggregated analytics;</li>
              <li>To send marketing communications (only where you have opted in).</li>
            </ul>
          </Section>

          <Section id="sharing" title="6. Who We Share Your Data With">
            <p>We share your data only where necessary and under appropriate safeguards:</p>
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li><strong>Estate agents and property professionals:</strong> when you make an enquiry or submit an offer, relevant contact details are shared with the listing agent;</li>
              <li><strong>Payment processors (Stripe):</strong> to handle subscription and transaction payments securely;</li>
              <li><strong>Identity verification providers:</strong> for AML-required KYC checks on high-value transactions;</li>
              <li><strong>Analytics providers (e.g., Google Analytics):</strong> using anonymised or pseudonymised data to improve Platform performance;</li>
              <li><strong>Cloud infrastructure providers (AWS / GCP):</strong> who host and store Platform data under data processing agreements;</li>
              <li><strong>Law enforcement and regulators:</strong> where we are legally required to disclose data (e.g., court order, NCA SAR obligations, ICO investigations);</li>
              <li><strong>Professional advisers:</strong> solicitors, auditors, insurers — under strict confidentiality obligations.</li>
            </ul>
            <p>We do not <strong>sell</strong> your personal data to third parties. We do not share your data with third parties for their own marketing purposes without your explicit consent.</p>
          </Section>

          <Section id="transfers" title="7. International Transfers">
            <p>Your data is primarily processed within the <strong>UK and EEA</strong>. Where we transfer data to countries outside these areas, we ensure adequate protection through one or more of:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>An adequacy decision by the UK Government or European Commission;</li>
              <li>Standard Contractual Clauses (SCCs) approved by the ICO or European Commission;</li>
              <li>Binding Corporate Rules or other approved transfer mechanisms.</li>
            </ul>
            <p>You may request details of the safeguards in place for any specific transfer by contacting us at <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a>.</p>
          </Section>

          <Section id="retention" title="8. Data Retention">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F6F2EC]">
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Data Category</th>
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Account data (active accounts)','Duration of account, then 2 years after closure'],
                    ['Property listings','Duration of listing, then 3 years'],
                    ['Transaction and payment records','7 years (HMRC legal requirement)'],
                    ['AML / KYC identity records','5 years from end of business relationship (MLR 2017)'],
                    ['Marketing consent records','Until consent is withdrawn, then 2 years'],
                    ['Platform usage logs','13 months (rolling)'],
                    ['Support correspondence','3 years from last contact'],
                  ].map(([c, r]) => (
                    <tr key={c} className="border-b border-[#E8E1D7]">
                      <td className="p-2 border border-[#E8E1D7]">{c}</td>
                      <td className="p-2 border border-[#E8E1D7]">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm">After retention periods expire, data is securely deleted or anonymised. Longer retention may apply where required by law or to defend legal claims.</p>
          </Section>

          <Section id="rights" title="9. Your Rights Under UK GDPR">
            <p>Under the UK GDPR and Data Protection Act 2018, you have the following rights:</p>
            <ul className="space-y-3 ml-3">
              {[
                ['Right of Access (Art. 15)','Request a copy of all personal data we hold about you (Subject Access Request / SAR).'],
                ['Right to Rectification (Art. 16)','Request correction of inaccurate or incomplete data.'],
                ['Right to Erasure (Art. 17)','Request deletion of your data (&ldquo;right to be forgotten&rdquo;) where there is no overriding legal reason to retain it.'],
                ['Right to Restriction (Art. 18)','Request that we limit processing of your data in certain circumstances.'],
                ['Right to Data Portability (Art. 20)','Request a structured, machine-readable copy of data you provided to us, to transfer to another service.'],
                ['Right to Object (Art. 21)','Object to processing based on legitimate interests, or to direct marketing at any time.'],
                ['Right to Withdraw Consent','Where processing is based on consent, withdraw it at any time without affecting prior lawful processing.'],
                ['Right Not to be Subject to Automated Decisions','Object to decisions made purely by automated means that produce legal or similarly significant effects.'],
              ].map(([r, d]) => (
                <li key={r} className="bg-[#F6F2EC] rounded-xl p-3">
                  <p className="font-semibold text-[#1C1A17] text-sm">{r}</p>
                  <p className="text-sm mt-0.5" dangerouslySetInnerHTML={{ __html: d }} />
                </li>
              ))}
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a> with &ldquo;Data Rights Request&rdquo; in the subject line. We will respond within <strong>one calendar month</strong>. We do not charge for reasonable requests.</p>
          </Section>

          <Section id="ico" title="10. Right to Complain to the ICO">
            <p>If you believe we have not handled your personal data in accordance with the law, you have the right to lodge a complaint with the <strong>Information Commissioner&rsquo;s Office (ICO)</strong>:</p>
            <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm space-y-1">
              <p><strong>Website:</strong> <a href="https://ico.org.uk" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">ico.org.uk</a></p>
              <p><strong>Phone:</strong> 0303 123 1113</p>
              <p><strong>Post:</strong> Information Commissioner&rsquo;s Office, Wycliffe House, Water Lane, Wilmslow, SK9 5AF</p>
            </div>
            <p>We would, however, appreciate the opportunity to address your concern before you contact the ICO, and encourage you to contact us first at <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a>.</p>
          </Section>

          <Section id="security" title="11. How We Protect Your Data">
            <p>We implement a range of technical and organisational measures to protect your data, including:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>TLS 1.3 encryption for all data in transit (HTTPS everywhere);</li>
              <li>AES-256 encryption for data at rest;</li>
              <li>Bcrypt hashing for all stored passwords;</li>
              <li>Role-based access controls (RBAC) and least-privilege principles;</li>
              <li>Regular penetration testing and vulnerability assessments;</li>
              <li>24/7 security monitoring and anomaly detection;</li>
              <li>Staff data protection training and confidentiality agreements.</li>
            </ul>
            <p>For full details, see our <Link href="/security" className="text-[#C9A96A] underline">Data Security Policy</Link>. In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the ICO within 72 hours (UK GDPR Art. 33) and affected individuals without undue delay where required (Art. 34).</p>
          </Section>

          <Section id="automated" title="12. Automated Decision-Making & Profiling">
            <p>We use automated systems to:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Generate indicative property valuations based on market data and property attributes;</li>
              <li>Personalise property recommendations based on your search history and preferences;</li>
              <li>Detect unusual account activity that may indicate fraud or a security threat.</li>
            </ul>
            <p>None of these automated processes produce <strong>legally binding decisions</strong> about you. Fraud flags are reviewed by a human team member before any account action is taken. You may object to any automated profiling by contacting us at <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a>.</p>
          </Section>

          <Section id="children" title="13. Children">
            <p>The Platform is not directed at children under the age of <strong>13</strong>. We do not knowingly collect personal data from children under 13. If you are a parent or guardian and believe your child has provided us with personal data without your consent, please contact us at <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a> and we will delete the data promptly.</p>
          </Section>

          <Section id="marketing" title="14. Marketing & Communications">
            <p>We will only send you direct marketing communications by email or SMS where you have explicitly opted in. You may withdraw your marketing consent at any time by:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Clicking &ldquo;Unsubscribe&rdquo; in any marketing email;</li>
              <li>Updating your preferences in your Account Settings;</li>
              <li>Emailing <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a>.</li>
            </ul>
            <p>Withdrawing marketing consent does not affect transactional or service notifications (e.g., booking confirmations, security alerts), which we send based on contract performance.</p>
          </Section>

          <Section id="third-party-links" title="15. Third-Party Links">
            <p>The Platform may contain links to third-party websites. This Privacy Policy does not apply to those sites. We encourage you to read the privacy policy of any third-party service you visit. We are not responsible for the privacy practices of third-party sites.</p>
          </Section>

          <Section id="changes" title="16. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Material changes will be notified by updating the &ldquo;Last updated&rdquo; date at the top and, where required, by emailing registered users. Your continued use of the Platform after changes take effect constitutes acceptance of the revised policy.</p>
          </Section>

          <Section id="contact" title="17. Contact & Data Protection Officer">
            <p>For all data protection queries, Subject Access Requests, or to exercise your rights:</p>
            <div className="bg-[#F6F2EC] rounded-xl p-5 space-y-1.5 text-sm">
              <p><strong>Data Protection Officer</strong></p>
              <p>Raxie Zenith Estate Ltd, 1 Mayfair Court, London, W1K 2AB</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a></p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {[['Terms of Service','/terms'],['Cookie Policy','/cookies'],['Security Policy','/security']].map(([l,h]) => (
                <Link key={h} href={h} className="text-[#C9A96A] underline">{l}</Link>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

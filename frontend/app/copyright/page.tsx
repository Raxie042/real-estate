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
  { id: 'ownership', title: '1. Ownership of Platform Content' },
  { id: 'protected', title: '2. What Is Protected by Copyright' },
  { id: 'permitted', title: '3. Permitted Use' },
  { id: 'prohibited', title: '4. Prohibited Use' },
  { id: 'user-content', title: '5. User-Submitted Content & Licence' },
  { id: 'agent-content', title: '6. Agent & Developer Submitted Content' },
  { id: 'trademarks', title: '7. Trademarks & Brand Assets' },
  { id: 'dmca', title: '8. Copyright Complaints (DMCA / UK Procedure)' },
  { id: 'database', title: '9. Database Rights' },
  { id: 'ai-training', title: '10. AI Training & Scraping Prohibition' },
  { id: 'enforcement', title: '11. Enforcement' },
  { id: 'contact', title: '12. Contact' },
];

export default function Copyright() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <section className="bg-[#1C1A17] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Legal</p>
          <h1 className="text-5xl font-light text-white mb-4">Copyright & Intellectual Property</h1>
          <p className="text-[#B9AA98]">Last updated: 18 May 2026 &nbsp;·&nbsp; Copyright, Designs and Patents Act 1988</p>
          <p className="text-[#B9AA98] mt-2 text-sm max-w-2xl">
            This policy explains our intellectual property rights in the Platform and its content, the rights you grant
            us in content you submit, and the process for reporting copyright infringement.
          </p>
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

          <Section id="ownership" title="1. Ownership of Platform Content">
            <p>
              The Raxie Zenith Estate platform and all content created by or for us — including but not limited to text,
              editorial articles, guides, market reports, software, source code, algorithms, user interface design, graphics,
              logos, photographs commissioned by us, audio-visual material, and data compilations — is owned by or licensed
              to <strong>Raxie Zenith Estate Ltd</strong> and is protected under the{' '}
              <strong>Copyright, Designs and Patents Act 1988</strong> and applicable international copyright treaties.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Raxie Zenith Estate Ltd. All rights reserved.
            </p>
          </Section>

          <Section id="protected" title="2. What Is Protected by Copyright">
            <p>The following categories of content on the Platform are protected intellectual property:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>Software and source code</strong> — the underlying code of the Platform, APIs, and mobile applications;</li>
              <li><strong>Platform design and UI/UX</strong> — the visual layout, user interface elements, iconography, and design system;</li>
              <li><strong>Editorial content</strong> — property guides, buying and renting articles, market analysis reports, investment research, blog posts;</li>
              <li><strong>Data compilations and databases</strong> — our property database, market data aggregations, and search index (see also Section 9 — Database Rights);</li>
              <li><strong>Photographs and media</strong> — photographs and videos commissioned by or exclusively licensed to Raxie Zenith Estate;</li>
              <li><strong>Branding</strong> — the Raxie Zenith Estate name, logo, taglines, and brand identity (see Section 7);</li>
              <li><strong>Proprietary methodologies</strong> — our automated valuation models, investment scoring algorithms, and market analysis frameworks.</li>
            </ul>
          </Section>

          <Section id="permitted" title="3. Permitted Use">
            <p>Subject to these terms, you may:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Browse, view, and access Platform content for your own <strong>personal, non-commercial use</strong>;</li>
              <li>Share links to pages on the Platform on social media or in personal communications;</li>
              <li>Print or download a reasonable number of pages for your own personal reference (not for redistribution);</li>
              <li>Reproduce small, attributed excerpts from our editorial content for the purpose of review or commentary (fair dealing under the Copyright, Designs and Patents Act 1988), provided you include a clear attribution and a link back to the source URL.</li>
            </ul>
          </Section>

          <Section id="prohibited" title="4. Prohibited Use">
            <p>You must <strong>not</strong>, without our prior written consent:</p>
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li>Copy, reproduce, republish, broadcast, or publicly display any substantial part of the Platform&rsquo;s content;</li>
              <li>Sell, license, rent, or otherwise commercially exploit any content from the Platform;</li>
              <li>Systematically download, scrape, crawl, or harvest content from the Platform in bulk or by automated means;</li>
              <li>Frame or mirror any page of the Platform on another website without written permission;</li>
              <li>Adapt, translate, or create derivative works based on Platform content;</li>
              <li>Use property photographs, descriptions, floor plans, or data from the Platform for any purpose other than evaluating a specific property you are genuinely interested in;</li>
              <li>Use Platform content to populate, train, or improve any competing property portal, database, or artificial intelligence model;</li>
              <li>Use Platform content for AI training datasets, machine learning models, or large language model fine-tuning, whether for commercial or non-commercial purposes.</li>
            </ul>
          </Section>

          <Section id="user-content" title="5. User-Submitted Content & Licence">
            <p>
              When you submit content to the Platform — such as property listings, photographs, descriptions, reviews,
              or messages — you represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>You are the sole and original author and owner of that content, or you hold a valid, unrestricted licence to use and sublicense it;</li>
              <li>The content does not infringe the copyright, trademark, or other intellectual property rights of any third party;</li>
              <li>Any property photographs are either taken by you, taken by a photographer who has assigned or licensed the rights to you, or you have a written licence from the photographer permitting such use.</li>
            </ul>
            <p>
              By submitting content, you grant Raxie Zenith Estate Ltd a <strong>non-exclusive, worldwide, royalty-free,
              sublicensable, transferable licence</strong> to use, reproduce, store, publish, transmit, distribute, adapt,
              and display that content for the purposes of operating, improving, and promoting the Platform. You retain
              ownership of your content. This licence terminates when you remove your content from the Platform (or when
              your account is closed), subject to copies retained in backups being deleted on their normal backup rotation
              schedule.
            </p>
          </Section>

          <Section id="agent-content" title="6. Agent & Developer Submitted Content">
            <p>
              Estate agents, property developers, and professional users who submit listings, brochures, floor plans,
              CGIs, and photography through our Platform represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>They hold all necessary intellectual property rights and licences to submit and display such content;</li>
              <li>All photography submitted has been taken by a professional photographer who has been paid for their work and has granted a licence for online property marketing use;</li>
              <li>Developer CGIs and architectural renders are either owned by or licensed to the submitter for marketing use.</li>
            </ul>
            <p>
              We accept no liability for content submitted by agents or developers that infringes third-party intellectual
              property rights. Agents and developers indemnify us against any such claims.
            </p>
          </Section>

          <Section id="trademarks" title="7. Trademarks & Brand Assets">
            <p>
              The following are registered or unregistered trademarks and service marks of Raxie Zenith Estate Ltd:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>The name <strong>&ldquo;Raxie Zenith Estate&rdquo;</strong>;</li>
              <li>The Raxie Zenith Estate logo and wordmark;</li>
              <li>Any taglines, slogans, or brand phrases used in marketing materials.</li>
            </ul>
            <p>
              You may not use any of these marks without our prior written consent. Specifically, you may not:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Use our trademarks in any domain name, social media handle, or business name;</li>
              <li>Create or sell merchandise bearing our trademarks;</li>
              <li>Use our trademarks in advertising or marketing in a way that implies endorsement by us.</li>
            </ul>
          </Section>

          <Section id="dmca" title="8. Copyright Complaints (DMCA / UK Procedure)">
            <p>
              If you believe that content on the Platform infringes your copyright, you may submit a formal copyright
              complaint to our designated agent. To be effective, your complaint must include:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Your full name, address, telephone number, and email address;</li>
              <li>A description of the copyrighted work you believe has been infringed;</li>
              <li>The specific URL(s) on our Platform where the allegedly infringing content appears;</li>
              <li>A statement that you have a good-faith belief that use of the material is not authorised by the copyright owner, its agent, or the law;</li>
              <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorised to act on the owner&rsquo;s behalf;</li>
              <li>Your electronic or physical signature.</li>
            </ul>
            <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm space-y-1">
              <p><strong>Designated Copyright Agent:</strong></p>
              <p>Legal Department, Raxie Zenith Estate Ltd<br />1 Mayfair Court, London, W1K 2AB</p>
              <p><strong>Email:</strong> <a href="mailto:copyright@raxiezenithestate.com" className="text-[#C9A96A]">copyright@raxiezenithestate.com</a></p>
            </div>
            <p>
              Upon receipt of a valid complaint, we will remove or disable access to the allegedly infringing content and
              notify the uploader. If the uploader believes the complaint is incorrect, they may submit a counter-notice.
              Repeat infringers will have their accounts terminated.
            </p>
            <p className="text-sm bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800">
              <strong>Warning:</strong> Submitting a false or misleading copyright complaint may expose you to liability
              for damages, including costs and legal fees. The Digital Millennium Copyright Act (17 U.S.C. § 512(f)) and
              equivalent UK provisions impose penalties for knowingly false complaints.
            </p>
          </Section>

          <Section id="database" title="9. Database Rights">
            <p>
              The property listings database, market data compilations, search index, and related data sets on the Platform
              constitute <strong>databases</strong> protected by the <strong>Database Directive (Directive 96/9/EC)</strong>,
              as retained in UK law, and by the <strong>Copyright, Designs and Patents Act 1988</strong>.
            </p>
            <p>
              We hold <strong>database rights</strong> in these compilations, which prevent extraction or re-utilisation
              of substantial parts of the database without our permission — regardless of whether individual entries are
              themselves copyrightable. Systematic or repeated extraction of even insubstantial parts may also infringe
              our database rights.
            </p>
          </Section>

          <Section id="ai-training" title="10. AI Training & Scraping Prohibition">
            <p>
              The use of any content, data, images, or other materials from the Platform for the purpose of training,
              testing, fine-tuning, or otherwise developing <strong>artificial intelligence</strong> or{' '}
              <strong>machine learning models</strong> — including but not limited to large language models (LLMs),
              image-recognition models, automated valuation models, or recommendation systems — is <strong>expressly
              prohibited</strong> without a separate written commercial licence agreement.
            </p>
            <p>
              This prohibition applies regardless of whether the training is for commercial or non-commercial purposes,
              and regardless of how the data is accessed (direct scraping, API, or other means). Our robots.txt file
              disallows all AI training crawlers. Violation of this prohibition constitutes both copyright infringement
              and a breach of our <Link href="/terms" className="text-[#C9A96A] underline">Terms of Service</Link>.
            </p>
            <p>
              Organisations wishing to licence our data for AI or research purposes should contact{' '}
              <a href="mailto:partnerships@raxiezenithestate.com" className="text-[#C9A96A]">partnerships@raxiezenithestate.com</a>.
            </p>
          </Section>

          <Section id="enforcement" title="11. Enforcement">
            <p>
              We actively monitor for and enforce our intellectual property rights. Where we identify infringement,
              we may take the following action:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Issue a cease-and-desist letter demanding immediate removal of infringing content;</li>
              <li>Request the hosting provider or platform of the infringing content to remove it;</li>
              <li>Initiate civil proceedings for copyright infringement, database right infringement, or trademark infringement;</li>
              <li>Seek injunctive relief to prevent further infringement;</li>
              <li>Claim damages, including additional damages for flagrant infringement under section 97(2) of the Copyright, Designs and Patents Act 1988.</li>
            </ul>
          </Section>

          <Section id="contact" title="12. Contact">
            <div className="bg-[#F6F2EC] rounded-xl p-5 text-sm space-y-1.5">
              <p><strong>Intellectual Property & Legal</strong></p>
              <p>Raxie Zenith Estate Ltd, 1 Mayfair Court, London, W1K 2AB</p>
              <p><strong>Copyright complaints:</strong> <a href="mailto:copyright@raxiezenithestate.com" className="text-[#C9A96A]">copyright@raxiezenithestate.com</a></p>
              <p><strong>Licensing enquiries:</strong> <a href="mailto:partnerships@raxiezenithestate.com" className="text-[#C9A96A]">partnerships@raxiezenithestate.com</a></p>
              <p><strong>General legal:</strong> <a href="mailto:legal@raxiezenithestate.com" className="text-[#C9A96A]">legal@raxiezenithestate.com</a></p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {[['Terms of Service','/terms'],['Privacy Policy','/privacy'],['Security Policy','/security'],['AML Policy','/aml']].map(([l,h]) => (
                <Link key={h} href={h} className="text-[#C9A96A] underline">{l}</Link>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

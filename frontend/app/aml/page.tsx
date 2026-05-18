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
  { id: 'legal-obligations', title: '1. Our Legal Obligations' },
  { id: 'supervised', title: '2. Our Supervised Status' },
  { id: 'cdd', title: '3. Customer Due Diligence (CDD)' },
  { id: 'edd', title: '4. Enhanced Due Diligence (EDD)' },
  { id: 'peps', title: '5. Politically Exposed Persons (PEPs)' },
  { id: 'source-of-funds', title: '6. Source of Funds & Wealth Verification' },
  { id: 'sars', title: '7. Suspicious Activity Reports (SARs)' },
  { id: 'sanctions', title: '8. Sanctions Screening' },
  { id: 'record-keeping', title: '9. Record Keeping' },
  { id: 'training', title: '10. Staff Training' },
  { id: 'penalties', title: '11. Penalties for Non-Compliance' },
  { id: 'rights', title: '12. Your Rights & Our Obligations to You' },
  { id: 'contact', title: '13. Contact Our Compliance Team' },
];

export default function AML() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <section className="bg-[#1C1A17] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Legal</p>
          <h1 className="text-5xl font-light text-white mb-4">Anti-Money Laundering Policy</h1>
          <p className="text-[#B9AA98]">Last updated: 18 May 2026 &nbsp;·&nbsp; Money Laundering Regulations 2017 (as amended 2019)</p>
          <p className="text-[#B9AA98] mt-2 text-sm max-w-2xl">
            As an estate agency business, Raxie Zenith Estate Ltd is legally required to maintain an Anti-Money Laundering
            (AML) programme. This document explains our obligations and what we may ask of you.
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

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-sm text-amber-800">
            <p className="font-semibold mb-1">Important Notice</p>
            <p>The UK property sector is one of the highest-risk sectors for money laundering, as identified by the UK National Risk Assessment. Raxie Zenith Estate takes its legal and moral obligations to combat financial crime extremely seriously. Failure to comply with our AML procedures may prevent us from facilitating your transaction.</p>
          </div>

          <Section id="legal-obligations" title="1. Our Legal Obligations">
            <p>Raxie Zenith Estate Ltd is subject to the following primary legislation and regulations:</p>
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li><strong>Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017</strong> (MLR 2017), as amended by the Money Laundering and Terrorist Financing (Amendment) Regulations 2019 — these regulations impose a duty to conduct Customer Due Diligence (CDD), monitor transactions, maintain records, and report suspicious activity;</li>
              <li><strong>Proceeds of Crime Act 2002 (POCA 2002)</strong> — which makes money laundering a criminal offence punishable by up to 14 years&rsquo; imprisonment, and which imposes obligations to report knowledge or suspicion of money laundering;</li>
              <li><strong>Terrorism Act 2000</strong> — which requires us to report knowledge or suspicion of terrorist financing;</li>
              <li><strong>Sanctions and Anti-Money Laundering Act 2018 (SAMLA)</strong> — which governs UK sanctions regimes post-Brexit.</li>
            </ul>
            <p>As an estate agency business falling within the scope of the MLR 2017, we are legally required to maintain a compliant AML programme, apply risk-based controls to all transactions, and cooperate with law enforcement and regulatory bodies.</p>
          </Section>

          <Section id="supervised" title="2. Our Supervised Status">
            <p>
              Raxie Zenith Estate Ltd is registered with and supervised by <strong>HM Revenue & Customs (HMRC)</strong> for
              Anti-Money Laundering purposes in our capacity as an estate agency business. Our HMRC MLR Reference Number
              is <strong>[TBC upon registration]</strong>.
            </p>
            <p>
              Our nominated <strong>Money Laundering Reporting Officer (MLRO)</strong> has day-to-day responsibility for
              our AML compliance programme and is the authorised officer for filing Suspicious Activity Reports (SARs)
              with the National Crime Agency (NCA).
            </p>
            <p>
              Our AML policies are reviewed and updated at least annually and following any changes to applicable
              legislation or HMRC/FATF guidance.
            </p>
          </Section>

          <Section id="cdd" title="3. Customer Due Diligence (CDD)">
            <p>
              Before we can facilitate a property transaction (sale, purchase, or rental at or above the relevant threshold),
              we are legally required to carry out <strong>Customer Due Diligence</strong> to verify the identity of all
              parties. This is not optional — it is a legal requirement.
            </p>
            <p><strong>For individual clients, we will typically require:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>A government-issued photo identity document (passport or driving licence) — confirming full name and date of birth;</li>
              <li>Proof of current address dated within the last 3 months (utility bill, bank statement, HMRC correspondence, or council tax bill).</li>
            </ul>
            <p><strong>For corporate clients (companies, LLPs, limited partnerships), we will require:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Certificate of Incorporation and Memorandum & Articles of Association;</li>
              <li>Register of Directors and confirmation of the company&rsquo;s registered address;</li>
              <li>Register of Persons with Significant Control (PSC Register) — identifying all beneficial owners who own or control more than 25% of the company&rsquo;s shares or voting rights;</li>
              <li>Verification of the identity of all beneficial owners (as per individual requirements above);</li>
              <li>Authorisation for the signatory to act on behalf of the entity.</li>
            </ul>
            <p><strong>For trusts, we will require:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Trust deed or declaration of trust;</li>
              <li>Identification of all trustees, settlors, and named beneficiaries (or a description of the class of beneficiaries).</li>
            </ul>
            <p>CDD must be completed <strong>before</strong> we can list a property, accept an offer, or otherwise facilitate a transaction. We may use electronic identity verification services to assist in this process.</p>
          </Section>

          <Section id="edd" title="4. Enhanced Due Diligence (EDD)">
            <p>
              We apply <strong>Enhanced Due Diligence (EDD)</strong> in higher-risk situations, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Transactions involving high-value properties (typically £500,000 and above, or any property where unusual circumstances arise);</li>
              <li>Clients based in high-risk third countries as listed by the UK Government, the Financial Action Task Force (FATF), or the European Commission;</li>
              <li>Transactions involving complex ownership structures (multiple layers of holding companies, offshore structures);</li>
              <li>Clients or transactions connected to a Politically Exposed Person (see Section 5);</li>
              <li>Transactions involving unusual payment methods or funding from unusual sources;</li>
              <li>Cash transactions or transactions funded by cryptocurrency or digital assets.</li>
            </ul>
            <p>
              EDD may involve additional documentation, senior management approval, and more detailed source of funds and
              source of wealth verification.
            </p>
          </Section>

          <Section id="peps" title="5. Politically Exposed Persons (PEPs)">
            <p>
              A <strong>Politically Exposed Person (PEP)</strong> is an individual who holds or has held a prominent
              public position — such as a head of state, government minister, senior civil servant, senior judicial or
              military official, senior executive of a state-owned enterprise, or senior official of a political party —
              and their immediate family members and known close associates.
            </p>
            <p>
              We are required to take reasonable steps to determine whether any client is a PEP. Where we identify a
              client as a PEP (or as a family member or close associate of a PEP), we apply Enhanced Due Diligence
              automatically. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Senior management approval before establishing or continuing a business relationship;</li>
              <li>Detailed source-of-funds and source-of-wealth verification;</li>
              <li>Enhanced ongoing monitoring of the relationship and transactions.</li>
            </ul>
            <p>
              PEP status alone does not prevent a transaction — it simply triggers a higher level of scrutiny, as required
              by the MLR 2017.
            </p>
          </Section>

          <Section id="source-of-funds" title="6. Source of Funds & Wealth Verification">
            <p>
              We are required to understand the <strong>source of funds</strong> used in a property transaction — that is,
              where the specific money for the purchase or deposit comes from. We may also need to understand the broader
              <strong> source of wealth</strong> — how you accumulated your overall wealth.
            </p>
            <p><strong>Evidence we may request includes:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li><strong>Personal savings:</strong> Bank statements covering 3&ndash;12 months showing the accumulation of funds;</li>
              <li><strong>Property sale proceeds:</strong> Completion statement from a solicitor or conveyancer confirming sale proceeds;</li>
              <li><strong>Inheritance:</strong> Grant of Probate, solicitor&rsquo;s letter, or bank statements showing receipt of funds;</li>
              <li><strong>Business income / dividends:</strong> Company accounts, dividend certificates, accountant&rsquo;s letter;</li>
              <li><strong>Gift:</strong> Signed gift letter from the donor confirming the gift is unconditional, plus source of funds evidence from the donor;</li>
              <li><strong>Mortgage:</strong> Mortgage offer from the lender;</li>
              <li><strong>Sale of shares or other investments:</strong> Broker statements, investment account statements.</li>
            </ul>
            <p>
              We understand this can feel intrusive. These requirements are not our choice — they are a <strong>legal
              obligation</strong> that applies to all estate agents in the UK, without exception. Failure to provide
              adequate source of funds evidence will prevent us from facilitating the transaction.
            </p>
          </Section>

          <Section id="sars" title="7. Suspicious Activity Reports (SARs)">
            <p>
              If we know or suspect that any funds involved in a transaction are the proceeds of crime, or that any
              party is involved in money laundering or terrorist financing, we are legally <strong>required</strong> to
              file a <strong>Suspicious Activity Report (SAR)</strong> with the <strong>National Crime Agency (NCA)</strong>.
              In some cases, we must obtain a <strong>Defence Against Money Laundering (DAML)</strong> from the NCA
              before proceeding with a transaction.
            </p>
            <p className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
              <strong>Tipping Off Warning:</strong> It is a criminal offence under section 333A of the Proceeds of Crime
              Act 2002 to &ldquo;tip off&rdquo; a person that a SAR has been or may be filed about them, or that an investigation
              is underway. If we file a SAR relating to your transaction, we are legally <strong>prohibited</strong> from
              disclosing this to you. Any delay or apparent hesitation in progressing a transaction should not be
              interpreted as evidence that a SAR has been filed.
            </p>
            <p>
              We will not be liable for any delay to a transaction caused by our compliance with our SAR obligations
              under POCA 2002.
            </p>
          </Section>

          <Section id="sanctions" title="8. Sanctions Screening">
            <p>
              We screen all clients and beneficial owners against the following sanctions lists before and during our
              business relationship:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li><strong>UK Consolidated List</strong> (OFSI — Office of Financial Sanctions Implementation);</li>
              <li><strong>UN Security Council Consolidated List</strong>;</li>
              <li><strong>EU Consolidated Sanctions List</strong> (for dual-national or international clients);</li>
              <li><strong>OFAC SDN List</strong> (US Office of Foreign Assets Control) where relevant.</li>
            </ul>
            <p>
              Where a client or beneficial owner matches or partially matches a sanctions listing, we will freeze the
              relationship, report to OFSI within 14 days as required by the Policing and Crime Act 2017, and take legal
              advice. We cannot facilitate any transaction with a sanctioned individual or entity.
            </p>
          </Section>

          <Section id="record-keeping" title="9. Record Keeping">
            <p>
              We are required by the MLR 2017 to retain all Customer Due Diligence documentation and records of transactions
              for a <strong>minimum of five years</strong> from the end of the business relationship or the completion of
              the transaction, whichever is later.
            </p>
            <p>
              Records are stored securely in encrypted form and access is restricted to authorised personnel with a
              legitimate need. These records may be disclosed to HMRC, the NCA, the FCA, the police, or other authorities
              where legally required.
            </p>
            <p>
              For information about how we process personal data collected for AML purposes, see our{' '}
              <Link href="/privacy" className="text-[#C9A96A] underline">Privacy Policy</Link> &mdash; the legal basis for
              such processing is a legal obligation under Art. 6(1)(c) UK GDPR.
            </p>
          </Section>

          <Section id="training" title="10. Staff Training">
            <p>
              All Raxie Zenith Estate employees and contractors who have contact with clients or handle property transactions
              receive mandatory AML training upon joining and at least annually thereafter. Training covers:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>The legal framework (MLR 2017, POCA 2002, Terrorism Act 2000);</li>
              <li>How to identify suspicious behaviour and red flags;</li>
              <li>Our internal SAR reporting procedures;</li>
              <li>The obligation to avoid tipping off;</li>
              <li>Customer Due Diligence and Enhanced Due Diligence procedures;</li>
              <li>Sanctions screening.</li>
            </ul>
            <p>Training records are maintained as required by HMRC guidance.</p>
          </Section>

          <Section id="penalties" title="11. Penalties for Non-Compliance">
            <p><strong>For us:</strong> Failure to comply with the MLR 2017 can result in HMRC supervision notices, financial penalties, public censure, and in serious cases, criminal prosecution of the business and its senior managers.</p>
            <p><strong>For clients:</strong> Involvement in money laundering is a serious criminal offence under POCA 2002, carrying a maximum sentence of <strong>14 years&rsquo; imprisonment</strong> and/or an unlimited fine. Terrorism financing offences under the Terrorism Act 2000 carry a maximum of <strong>14 years</strong>. Breaching UK financial sanctions is a criminal offence under the Policing and Crime Act 2017 carrying up to <strong>7 years&rsquo; imprisonment</strong>.</p>
          </Section>

          <Section id="rights" title="12. Your Rights & Our Obligations to You">
            <p>
              We understand that AML checks can be inconvenient. We aim to conduct them as efficiently and respectfully
              as possible. We will:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Tell you what documents we need and why;</li>
              <li>Process your documents securely and confidentially;</li>
              <li>Retain your documents only as long as legally required and then securely destroy them;</li>
              <li>Treat all information you provide with strict confidentiality.</li>
            </ul>
            <p>
              We will not discriminate on grounds of nationality, ethnicity, or any other protected characteristic in
              applying our AML procedures. Our procedures are applied on a <strong>risk-based</strong> basis, not on the
              basis of any protected characteristic.
            </p>
          </Section>

          <Section id="contact" title="13. Contact Our Compliance Team">
            <p>If you have questions about our AML procedures, or if you need to discuss the documentation required for a transaction:</p>
            <div className="bg-[#F6F2EC] rounded-xl p-5 text-sm space-y-1.5">
              <p><strong>Compliance Department</strong></p>
              <p>Raxie Zenith Estate Ltd, 1 Mayfair Court, London, W1K 2AB</p>
              <p><strong>Email:</strong> <a href="mailto:compliance@raxiezenithestate.com" className="text-[#C9A96A]">compliance@raxiezenithestate.com</a></p>
              <p><strong>MLRO:</strong> [Name], reachable via compliance@raxiezenithestate.com</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {[['Terms of Service','/terms'],['Privacy Policy','/privacy'],['Security Policy','/security'],['Copyright & IP','/copyright']].map(([l,h]) => (
                <Link key={h} href={h} className="text-[#C9A96A] underline">{l}</Link>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

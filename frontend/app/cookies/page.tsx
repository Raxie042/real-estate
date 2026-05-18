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
  { id: 'what', title: '1. What Are Cookies?' },
  { id: 'why', title: '2. Why We Use Cookies' },
  { id: 'categories', title: '3. Categories of Cookies' },
  { id: 'table', title: '4. Cookie Details' },
  { id: 'third-party', title: '5. Third-Party Cookies' },
  { id: 'consent', title: '6. Your Consent' },
  { id: 'withdraw', title: '7. Withdrawing Consent' },
  { id: 'browser', title: '8. Browser Controls' },
  { id: 'changes', title: '9. Changes to This Policy' },
  { id: 'contact', title: '10. Contact Us' },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <section className="bg-[#1C1A17] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Legal</p>
          <h1 className="text-5xl font-light text-white mb-4">Cookie Policy</h1>
          <p className="text-[#B9AA98]">Last updated: 18 May 2026 &nbsp;·&nbsp; Privacy and Electronic Communications Regulations (PECR)</p>
          <p className="text-[#B9AA98] mt-2 text-sm max-w-2xl">This policy explains what cookies we use on the Raxie Zenith Estate platform, why we use them, and how you can control your cookie preferences.</p>
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

          <Section id="what" title="1. What Are Cookies?">
            <p>Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They allow the website to recognise your device, remember your preferences, and improve your browsing experience. Cookies do not contain viruses or malware.</p>
            <p>Similar technologies such as <strong>web beacons</strong>, <strong>pixel tags</strong>, and <strong>local storage</strong> work in comparable ways and are covered by this policy.</p>
          </Section>

          <Section id="why" title="2. Why We Use Cookies">
            <p>We use cookies to:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Keep you logged in during your session;</li>
              <li>Remember your preferences (currency, language, saved searches);</li>
              <li>Protect the security of your account and detect fraudulent activity;</li>
              <li>Measure how the Platform is used so we can improve it;</li>
              <li>Personalise property recommendations based on your browsing history;</li>
              <li>Deliver relevant advertising (only with your consent).</li>
            </ul>
          </Section>

          <Section id="categories" title="3. Categories of Cookies">
            <div className="space-y-4">
              <div className="bg-[#F6F2EC] rounded-xl p-4">
                <p className="font-semibold text-[#1C1A17]">🔒 Strictly Necessary (Essential)</p>
                <p className="text-sm mt-1">Required for the Platform to function. These cannot be disabled. They include session management, authentication tokens, security tokens, and load-balancing cookies. No consent is required under PECR.</p>
              </div>
              <div className="bg-[#F6F2EC] rounded-xl p-4">
                <p className="font-semibold text-[#1C1A17]">📊 Analytics & Performance</p>
                <p className="text-sm mt-1">Help us understand how visitors use the Platform (pages visited, time on site, error rates). Data is aggregated and anonymised where possible. <strong>Requires your consent.</strong></p>
              </div>
              <div className="bg-[#F6F2EC] rounded-xl p-4">
                <p className="font-semibold text-[#1C1A17]">⚙️ Functional & Preferences</p>
                <p className="text-sm mt-1">Remember your choices — saved searches, comparison lists, preferred currency, language settings. <strong>Requires your consent.</strong></p>
              </div>
              <div className="bg-[#F6F2EC] rounded-xl p-4">
                <p className="font-semibold text-[#1C1A17]">🎯 Marketing & Targeting</p>
                <p className="text-sm mt-1">Used to deliver personalised property recommendations and relevant advertising across the web. May involve third-party ad networks. <strong>Requires your consent.</strong></p>
              </div>
            </div>
          </Section>

          <Section id="table" title="4. Cookie Details">
            <p className="text-sm mb-3">Below is a list of the main cookies we set or allow on the Platform:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F6F2EC]">
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Name</th>
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Category</th>
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Purpose</th>
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Duration</th>
                    <th className="text-left p-2 border border-[#E8E1D7] text-[#1C1A17]">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['rze_session','Essential','User authentication session token','Session','Raxie Zenith Estate'],
                    ['rze_csrf','Essential','CSRF attack prevention token','Session','Raxie Zenith Estate'],
                    ['rze_cookie_consent','Essential','Records your cookie consent choices','1 year','Raxie Zenith Estate'],
                    ['rze_prefs','Functional','Stores your currency, language, and UI preferences','1 year','Raxie Zenith Estate'],
                    ['rze_searches','Functional','Saves your recent search history','30 days','Raxie Zenith Estate'],
                    ['_ga','Analytics','Google Analytics — distinguishes unique users','2 years','Google'],
                    ['_ga_*','Analytics','Google Analytics — session state','2 years','Google'],
                    ['_gid','Analytics','Google Analytics — stores session information','24 hours','Google'],
                    ['_fbp','Marketing','Facebook Pixel — tracks conversions and enables retargeting','90 days','Meta'],
                    ['_gcl_au','Marketing','Google Ads conversion tracking','90 days','Google'],
                  ].map(([n,c,p,d,prov]) => (
                    <tr key={n} className="border-b border-[#E8E1D7]">
                      <td className="p-2 border border-[#E8E1D7] font-mono">{n}</td>
                      <td className="p-2 border border-[#E8E1D7]">{c}</td>
                      <td className="p-2 border border-[#E8E1D7]">{p}</td>
                      <td className="p-2 border border-[#E8E1D7] whitespace-nowrap">{d}</td>
                      <td className="p-2 border border-[#E8E1D7] whitespace-nowrap">{prov}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#7A6E60] mt-2">This list is updated periodically. Additional cookies may be set by third-party services embedded in the Platform.</p>
          </Section>

          <Section id="third-party" title="5. Third-Party Cookies">
            <p>Some cookies are set by third-party services that appear on our pages. These providers have their own privacy and cookie policies:</p>
            <ul className="list-disc list-inside space-y-1 ml-3 text-sm">
              <li><strong>Google Analytics</strong> — website analytics: <a href="https://policies.google.com/privacy" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
              <li><strong>Google Maps</strong> — property location maps: <a href="https://policies.google.com/privacy" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
              <li><strong>Stripe</strong> — payment processing: <a href="https://stripe.com/gb/privacy" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">stripe.com/gb/privacy</a></li>
              <li><strong>Meta (Facebook Pixel)</strong> — advertising and analytics: <a href="https://www.facebook.com/privacy/explanation" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">facebook.com/privacy</a></li>
              <li><strong>YouTube</strong> — embedded property videos: <a href="https://policies.google.com/privacy" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
            </ul>
            <p>We have no control over third-party cookies. You may opt out of third-party tracking via the <a href="https://youradchoices.co.uk" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">YourAdChoices</a> portal or the <a href="https://www.networkadvertising.org/choices/" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out tool</a>.</p>
          </Section>

          <Section id="consent" title="6. Your Consent">
            <p>When you first visit the Platform, a cookie consent banner will ask for your permission before placing non-essential cookies. You may:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li><strong>Accept All</strong> — allow all cookies including analytics and marketing;</li>
              <li><strong>Manage Preferences</strong> — choose which categories you accept;</li>
              <li><strong>Reject All (non-essential)</strong> — only strictly necessary cookies will be set.</li>
            </ul>
            <p>Your preferences are saved in a first-party cookie for 12 months. You can change them at any time.</p>
          </Section>

          <Section id="withdraw" title="7. Withdrawing Consent">
            <p>You can withdraw or change your cookie consent at any time by:</p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>Clicking the <strong>&ldquo;Cookie Settings&rdquo;</strong> link in the footer of any page;</li>
              <li>Clearing your browser cookies — this will reset your preferences and the consent banner will reappear on your next visit;</li>
              <li>Contacting us at <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a>.</li>
            </ul>
            <p>Withdrawing consent for non-essential cookies will not affect the performance of core features of the Platform.</p>
          </Section>

          <Section id="browser" title="8. Browser Controls">
            <p>Most browsers allow you to manage cookies through their settings. You can set your browser to refuse cookies, alert you when cookies are set, or delete existing cookies. Note that disabling all cookies may impact your experience and disable some features.</p>
            <p>Browser cookie settings guides:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {[['Chrome','https://support.google.com/chrome/answer/95647'],['Firefox','https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer'],['Safari','https://support.apple.com/en-gb/guide/safari/sfri11471/mac'],['Edge','https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge'],['Opera','https://help.opera.com/en/latest/web-preferences/']].map(([b,u]) => (
                <a key={b} href={u} target="_blank" rel="noopener noreferrer" className="bg-[#F6F2EC] rounded-lg p-2.5 text-center text-[#C9A96A] hover:bg-[#E8DFD5] transition-colors">{b}</a>
              ))}
            </div>
          </Section>

          <Section id="changes" title="9. Changes to This Policy">
            <p>We may update this Cookie Policy to reflect changes to our technology, applicable law, or the cookies we use. Material changes will be communicated via the cookie consent banner on your next visit and by updating the &ldquo;Last updated&rdquo; date above.</p>
          </Section>

          <Section id="contact" title="10. Contact Us">
            <p>For questions about our use of cookies:</p>
            <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm space-y-1">
              <p><strong>Raxie Zenith Estate Ltd</strong></p>
              <p>1 Mayfair Court, London, W1K 2AB</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@raxiezenithestate.com" className="text-[#C9A96A]">privacy@raxiezenithestate.com</a></p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {[['Privacy Policy','/privacy'],['Terms of Service','/terms'],['Security Policy','/security']].map(([l,h]) => (
                <Link key={h} href={h} className="text-[#C9A96A] underline">{l}</Link>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

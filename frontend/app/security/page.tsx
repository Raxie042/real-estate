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
  { id: 'commitment', title: '1. Our Security Commitment' },
  { id: 'encryption-transit', title: '2. Encryption in Transit' },
  { id: 'encryption-rest', title: '3. Encryption at Rest' },
  { id: 'passwords', title: '4. Password Security' },
  { id: 'authentication', title: '5. Authentication & Session Management' },
  { id: '2fa', title: '6. Two-Factor Authentication (2FA)' },
  { id: 'database', title: '7. Database Security' },
  { id: 'access', title: '8. Access Controls' },
  { id: 'monitoring', title: '9. Security Monitoring & Logging' },
  { id: 'vulnerability', title: '10. Vulnerability Management' },
  { id: 'incident', title: '11. Incident Response & Breach Notification' },
  { id: 'third-party-security', title: '12. Third-Party Security' },
  { id: 'your-responsibilities', title: '13. Your Security Responsibilities' },
  { id: 'report', title: '14. Report a Vulnerability' },
  { id: 'changes', title: '15. Changes to This Policy' },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <section className="bg-[#1C1A17] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Legal</p>
          <h1 className="text-5xl font-light text-white mb-4">Data Security Policy</h1>
          <p className="text-[#B9AA98]">Last updated: 18 May 2026 &nbsp;·&nbsp; UK GDPR Art. 32 — Security of Processing</p>
          <p className="text-[#B9AA98] mt-2 text-sm max-w-2xl">
            The security of your personal data is a core obligation under UK GDPR Article 32. This document describes the
            technical and organisational measures Raxie Zenith Estate Ltd implements to protect your data.
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

          <Section id="commitment" title="1. Our Security Commitment">
            <p>
              Raxie Zenith Estate Ltd is committed to protecting the personal, financial, and transactional data of our users,
              agents, and partners. We take a layered &ldquo;defence-in-depth&rdquo; approach to security — meaning that multiple
              independent security controls protect your data at every stage of its lifecycle.
            </p>
            <p>
              Our security programme is governed by our obligations under <strong>UK GDPR Article 32</strong> (security of
              processing), the <strong>Data Protection Act 2018</strong>, and applicable industry standards including
              <strong> ISO/IEC 27001</strong> principles and <strong>OWASP</strong> security guidelines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {[
                ['🔐','Encrypted in Transit','TLS 1.3 on all connections'],
                ['🛡️','Encrypted at Rest','AES-256 for stored data'],
                ['🔑','Hashed Passwords','bcrypt — never plain-text'],
              ].map(([icon, t, d]) => (
                <div key={t} className="bg-[#F6F2EC] rounded-xl p-4 text-center">
                  <p className="text-2xl mb-1">{icon}</p>
                  <p className="font-semibold text-[#1C1A17] text-sm">{t}</p>
                  <p className="text-xs text-[#7A6E60] mt-0.5">{d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="encryption-transit" title="2. Encryption in Transit (HTTPS / TLS)">
            <p>
              All data transmitted between your browser or device and our servers is encrypted using
              <strong> Transport Layer Security (TLS) 1.3</strong>, the current industry gold standard.
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>HTTPS everywhere:</strong> All pages are served over HTTPS. Any HTTP request is automatically redirected to HTTPS with a <strong>301 permanent redirect</strong>.</li>
              <li><strong>HSTS (HTTP Strict Transport Security):</strong> Our servers send HSTS headers, instructing browsers to only connect via HTTPS for a minimum of 12 months, preventing protocol downgrade attacks.</li>
              <li><strong>Strong cipher suites:</strong> We disable weak protocols (TLS 1.0, TLS 1.1, SSL 2/3) and support only strong, forward-secret cipher suites (ECDHE, AES-GCM).</li>
              <li><strong>Certificate validity:</strong> Our SSL/TLS certificates are issued by trusted certificate authorities (CAs) and renewed before expiry. Certificate Transparency logs are monitored.</li>
              <li><strong>API security:</strong> All API endpoints are served over HTTPS and require valid authentication tokens. Sensitive data is never passed in URL query strings.</li>
            </ul>
          </Section>

          <Section id="encryption-rest" title="3. Encryption at Rest">
            <p>
              All sensitive data stored on our servers and databases is encrypted at rest using
              <strong> AES-256 (Advanced Encryption Standard with 256-bit keys)</strong> — the same standard used by
              banks, governments, and military organisations worldwide.
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Database volumes are encrypted at the storage layer by our cloud infrastructure provider;</li>
              <li>Backups are encrypted separately with independently managed keys;</li>
              <li>Encryption keys are rotated regularly and stored in a dedicated secrets management service (not in the application code);</li>
              <li>Particularly sensitive fields (financial data, identity documents) are encrypted at the application layer in addition to storage-layer encryption.</li>
            </ul>
          </Section>

          <Section id="passwords" title="4. Password Security">
            <p>
              We take password security seriously. Here is exactly how we handle your password:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>Never stored in plain text.</strong> Your password is immediately hashed using <strong>bcrypt</strong> with a unique salt before storage. Even in a worst-case scenario where our database were accessed without authorisation, your actual password could not be read.</li>
              <li><strong>Never transmitted unnecessarily.</strong> After initial account creation or login, your password is not sent across the network. All subsequent authentication uses secure session tokens.</li>
              <li><strong>Minimum strength enforced:</strong> We require passwords of at least 8 characters with mixed case, a number, and a symbol. We check new passwords against known breached-password lists (using the <a href="https://haveibeenpwned.com/API/v3#searchingPwnedPasswordsByRange" className="text-[#C9A96A]" target="_blank" rel="noopener noreferrer">HaveIBeenPwned API</a> in a privacy-preserving manner).</li>
              <li><strong>Rate limiting:</strong> Login attempts are rate-limited and temporary locks applied after repeated failures to prevent brute-force attacks.</li>
              <li><strong>Secure password reset:</strong> Password reset links are single-use, time-limited (expire after 1 hour), and delivered to the registered email address only.</li>
            </ul>
          </Section>

          <Section id="authentication" title="5. Authentication & Session Management">
            <p>
              We use <strong>JSON Web Tokens (JWT)</strong> for authentication, following security best practices:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Access tokens have a short lifespan (typically 15 minutes) to limit exposure if intercepted;</li>
              <li>Refresh tokens allow seamless session continuation without re-entering your password;</li>
              <li>Sessions are invalidated server-side on logout — tokens cannot be reused after you sign out;</li>
              <li>Tokens are stored in <strong>HttpOnly, Secure cookies</strong> — not in localStorage — protecting against XSS (Cross-Site Scripting) attacks;</li>
              <li>CSRF (Cross-Site Request Forgery) protection is enforced on all state-changing requests via SameSite cookie attributes and CSRF tokens;</li>
              <li>Concurrent sessions from unusual locations trigger a security alert email to the registered address.</li>
            </ul>
          </Section>

          <Section id="2fa" title="6. Two-Factor Authentication (2FA)">
            <p>
              We strongly encourage all users to enable <strong>Two-Factor Authentication (2FA)</strong> for their account.
              2FA adds a second layer of verification beyond your password, meaning that even if your password is compromised,
              an attacker cannot access your account without also possessing your second factor.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3">
              <li>We support authenticator apps (Google Authenticator, Authy, Microsoft Authenticator) using TOTP (Time-based One-Time Passwords);</li>
              <li>SMS-based verification is also available as a secondary option;</li>
              <li>2FA is mandatory for agency accounts, admin accounts, and accounts with access to private listings or the Private Office service.</li>
            </ul>
            <p>Enable 2FA in your <Link href="/profile" className="text-[#C9A96A] underline">Account Settings</Link>.</p>
          </Section>

          <Section id="database" title="7. Database Security">
            <p>Our database infrastructure is designed with security as a primary concern:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>No direct public internet access:</strong> Our databases are deployed in private subnets within our Virtual Private Cloud (VPC) and are not accessible from the public internet;</li>
              <li><strong>Network isolation:</strong> Database servers communicate only with authorised application servers over private, encrypted internal connections;</li>
              <li><strong>Encrypted at rest:</strong> All database volumes use AES-256 encryption (see Section 3);</li>
              <li><strong>Parameterised queries:</strong> All database queries use prepared statements and parameterised inputs, eliminating the risk of SQL injection attacks;</li>
              <li><strong>Automated backups:</strong> Databases are backed up daily with point-in-time recovery capability. Backups are encrypted and stored in a geographically separate location;</li>
              <li><strong>Principle of least privilege:</strong> Application services access only the specific database tables and operations they require. No service has unnecessary superuser privileges.</li>
            </ul>
          </Section>

          <Section id="access" title="8. Access Controls">
            <p>
              Access to user data within our organisation is governed by the <strong>principle of least privilege</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>Only authorised personnel with a legitimate business need can access personal data;</li>
              <li>Access is managed through <strong>Role-Based Access Control (RBAC)</strong> — employees are granted only the minimum permissions required for their role;</li>
              <li>All staff access requires multi-factor authentication;</li>
              <li>Access to production systems is logged and audited. All access events are retained for a minimum of 12 months;</li>
              <li>Privileged access (e.g., database administration) is subject to additional approval, time-limited sessions, and enhanced monitoring;</li>
              <li>Access rights are reviewed quarterly and revoked immediately upon employee departure or role change.</li>
            </ul>
          </Section>

          <Section id="monitoring" title="9. Security Monitoring & Logging">
            <p>We maintain comprehensive security monitoring to detect and respond to threats in real time:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>All application, authentication, and infrastructure events are logged to a centralised, tamper-evident Security Information and Event Management (SIEM) system;</li>
              <li>Automated alerts notify our security team of anomalies including unusual login patterns, high-volume data requests, or unexpected API usage;</li>
              <li>Distributed Denial of Service (DDoS) protection is provided at the network edge via our CDN provider;</li>
              <li>A Web Application Firewall (WAF) filters malicious traffic, blocking known attack patterns (SQL injection, XSS, CSRF, etc.);</li>
              <li>Security logs are retained for a minimum of 12 months and are protected from tampering.</li>
            </ul>
          </Section>

          <Section id="vulnerability" title="10. Vulnerability Management & Penetration Testing">
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>Penetration testing:</strong> We commission independent penetration tests by qualified security specialists (CREST-accredited) at least annually, and after significant platform changes;</li>
              <li><strong>Vulnerability scanning:</strong> Automated vulnerability scanning is run continuously against all production systems;</li>
              <li><strong>Dependency management:</strong> All third-party software libraries are regularly audited for known vulnerabilities (CVEs). Critical patches are applied within 24 hours; high-severity patches within 7 days;</li>
              <li><strong>Secure software development:</strong> Our development process incorporates static code analysis (SAST), secret scanning (no credentials committed to source code), and peer code review for all changes;</li>
              <li><strong>Bug bounty programme:</strong> We welcome responsible disclosure of security vulnerabilities — see Section 14.</li>
            </ul>
          </Section>

          <Section id="incident" title="11. Incident Response & Breach Notification">
            <p>
              Despite our best efforts, no system can be guaranteed 100% secure. In the event of a suspected security
              incident, our Incident Response plan provides for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>Immediate containment:</strong> Suspected breaches are triaged and contained within hours of detection;</li>
              <li><strong>ICO notification:</strong> Where a personal data breach poses a risk to individuals&rsquo; rights and freedoms, we notify the <strong>Information Commissioner&rsquo;s Office (ICO) within 72 hours</strong> of becoming aware, as required by UK GDPR Article 33;</li>
              <li><strong>Individual notification:</strong> Where a breach is likely to result in high risk to you personally, we notify you directly <strong>without undue delay</strong> (UK GDPR Article 34) with clear information about what happened and what steps you should take;</li>
              <li><strong>Post-incident review:</strong> Every incident triggers a formal root-cause analysis and improvement action plan.</li>
            </ul>
            <p>
              If you believe your account or data may have been compromised, contact us immediately at{' '}
              <a href="mailto:security@raxiezenithestate.com" className="text-[#C9A96A]">security@raxiezenithestate.com</a>.
            </p>
          </Section>

          <Section id="third-party-security" title="12. Third-Party Security">
            <p>
              Where we share your data with third-party processors (e.g., cloud hosting, payment processing, analytics),
              we ensure each processor meets our security standards:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li>All processors are bound by a <strong>Data Processing Agreement (DPA)</strong> as required by UK GDPR Article 28;</li>
              <li>We vet processors for security certifications (ISO 27001, SOC 2, PCI-DSS where applicable);</li>
              <li>Payment card data is handled exclusively by <strong>Stripe</strong>, a PCI-DSS Level 1 compliant payment processor. We never store, process, or transmit raw card numbers ourselves;</li>
              <li>Cloud infrastructure is provided by Amazon Web Services (AWS) or Google Cloud Platform (GCP), both of which maintain extensive security certifications.</li>
            </ul>
          </Section>

          <Section id="your-responsibilities" title="13. Your Security Responsibilities">
            <p>Security is a shared responsibility. To keep your account secure, we ask you to:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-3">
              <li><strong>Use a strong, unique password</strong> for your Raxie Zenith Estate account. Do not reuse passwords from other services.</li>
              <li><strong>Enable Two-Factor Authentication (2FA)</strong> — available in your Account Settings.</li>
              <li><strong>Never share your login credentials</strong> with anyone, including estate agents, colleagues, or third parties claiming to represent us.</li>
              <li><strong>Be vigilant against phishing.</strong> We will never ask for your password by email or phone. Always verify you are on <strong>www.raxiezenithestate.com</strong> before entering your credentials.</li>
              <li><strong>Log out on shared devices</strong> — do not leave your account session open on public or shared computers.</li>
              <li><strong>Keep your devices secure</strong> — ensure your devices run up-to-date operating systems and security software.</li>
              <li><strong>Report suspicious activity</strong> promptly to <a href="mailto:security@raxiezenithestate.com" className="text-[#C9A96A]">security@raxiezenithestate.com</a>.</li>
            </ul>
          </Section>

          <Section id="report" title="14. Report a Vulnerability (Responsible Disclosure)">
            <p>
              We welcome responsible disclosure of security vulnerabilities from the security research community. If you
              discover a vulnerability in the Raxie Zenith Estate platform, please contact us <strong>before</strong> publicly
              disclosing it to allow us time to investigate and remediate.
            </p>
            <div className="bg-[#F6F2EC] rounded-xl p-5 space-y-2 text-sm">
              <p><strong>Security contact:</strong> <a href="mailto:security@raxiezenithestate.com" className="text-[#C9A96A]">security@raxiezenithestate.com</a></p>
              <p><strong>Please include in your report:</strong></p>
              <ul className="list-disc list-inside ml-3 space-y-1">
                <li>A clear description of the vulnerability and its potential impact;</li>
                <li>Steps to reproduce the issue;</li>
                <li>Any proof-of-concept code or screenshots (anonymised if possible).</li>
              </ul>
              <p><strong>Our commitments:</strong> We will acknowledge receipt within 2 business days, provide a substantive response within 10 business days, and notify you when the vulnerability has been resolved. We will not take legal action against researchers who follow this responsible disclosure process in good faith.</p>
            </div>
          </Section>

          <Section id="changes" title="15. Changes to This Policy">
            <p>
              We review and update this Security Policy at least annually and following any significant security incident or
              system change. Material changes will be communicated via the Platform and by email to registered users.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {[['Privacy Policy','/privacy'],['Terms of Service','/terms'],['Cookie Policy','/cookies']].map(([l,h]) => (
                <Link key={h} href={h} className="text-[#C9A96A] underline">{l}</Link>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

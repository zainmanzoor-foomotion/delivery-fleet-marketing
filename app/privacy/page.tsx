import Link from 'next/link'

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'Account Information: When you sign up for My Delivery Fleet, we collect your name, email address, business name, phone number, and billing information.',
      'Order & Delivery Data: We collect data related to orders placed, delivery routes, driver assignments, customer delivery addresses, and order values to operate our platform.',
      'Usage Data: We automatically collect information about how you interact with our platform, including log data, device information, IP address, browser type, and pages visited.',
      'Customer Data: As part of our service, we process customer information (such as delivery addresses and contact details) on behalf of your restaurant. You are the data controller for this information.',
      'Marketing Opt-In Data: With explicit customer consent collected during the delivery tracking experience, we store marketing preferences and contact details for SMS campaigns.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To provide, maintain, and improve the My Delivery Fleet platform and services.',
      'To process payments and manage your subscription.',
      'To dispatch on-demand drivers and facilitate deliveries.',
      'To power branded tracking pages and customer-facing delivery experiences.',
      'To send SMS marketing campaigns on your behalf to opted-in customers.',
      'To send you service updates, account notifications, and support communications.',
      'To analyze platform usage and improve our algorithms and features.',
      'To comply with legal obligations and enforce our Terms of Service.',
    ],
  },
  {
    title: '3. Sharing of Information',
    content: [
      'Driver Partners: We share necessary order and location information with on-demand drivers to complete deliveries.',
      'Payment Processors: Billing information is shared with our payment processor (Stripe) to handle transactions securely.',
      'SMS Providers: Customer contact details and marketing content are shared with our SMS gateway provider to send campaigns.',
      'Analytics Providers: We use anonymized and aggregated data with analytics services to improve our platform.',
      'Legal Requirements: We may disclose information if required by law, regulation, or valid legal process.',
      'We do not sell your personal information or your customers\' personal information to third parties.',
    ],
  },
  {
    title: '4. Data Retention',
    content: [
      'We retain your account and business data for as long as your account is active or as needed to provide services.',
      'Delivery and order records are retained for up to 3 years for accounting and dispute resolution purposes.',
      'Customer marketing opt-in data is retained until a customer opts out or you request deletion.',
      'Upon account termination, we will delete or anonymize your data within 90 days, unless retention is required by law.',
    ],
  },
  {
    title: '5. Security',
    content: [
      'We implement industry-standard security measures including encryption in transit (TLS), encryption at rest, and access controls to protect your data.',
      'We conduct regular security reviews and vulnerability assessments.',
      'While we take all reasonable steps to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.',
      'You are responsible for maintaining the confidentiality of your account credentials.',
    ],
  },
  {
    title: '6. Your Rights',
    content: [
      'Access: You may request a copy of the personal data we hold about you.',
      'Correction: You may request correction of inaccurate or incomplete data.',
      'Deletion: You may request deletion of your personal data, subject to legal retention requirements.',
      'Portability: You may request a machine-readable export of your data.',
      'Opt-Out: You may opt out of marketing communications at any time via account settings or by contacting us.',
      'To exercise any of these rights, please contact us at privacy@mydeliveryfleet.com.',
    ],
  },
  {
    title: '7. Cookies',
    content: [
      'We use cookies and similar tracking technologies to maintain session state, remember your preferences, and analyze platform usage.',
      'Essential cookies are required for the platform to function and cannot be disabled.',
      'Analytics cookies help us understand usage patterns. You may opt out via your browser settings.',
      'We do not use cookies for third-party advertising.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time. We will notify you of material changes via email or a prominent notice on the platform.',
      'Your continued use of My Delivery Fleet after changes take effect constitutes acceptance of the updated policy.',
      'We encourage you to review this policy periodically.',
    ],
  },
  {
    title: '9. Contact Us',
    content: [
      'If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:',
      'Email: privacy@mydeliveryfleet.com',
      'Address: My Delivery Fleet, Inc.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <Link href="/" className="text-sm text-text-2 hover:text-text-1 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <p className="text-sm font-medium text-[#1877F2] mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-1">Privacy Policy</h1>
          <p className="mt-4 text-text-2 text-base sm:text-lg">
            Last updated: April 17, 2026
          </p>
          <p className="mt-4 text-text-2 text-base sm:text-lg max-w-3xl">
            My Delivery Fleet (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This policy explains how we collect, use, share, and protect your information when you
            use our platform and services.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="flex flex-col gap-10">
          {sections.map(({ title, content }) => (
            <div key={title} className="flex flex-col gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-1">{title}</h2>
              <ul className="flex flex-col gap-3">
                {content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-text-2 text-sm sm:text-base leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1877F2]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-b border-[#E5E7EB]" />
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-6">
          <p className="text-sm text-text-2">
            For questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:privacy@mydeliveryfleet.com" className="text-[#1877F2] font-medium hover:underline">
              privacy@mydeliveryfleet.com
            </a>
            . You can also review our{' '}
            <Link href="/terms" className="text-[#1877F2] font-medium hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}

import Link from 'next/link'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using My Delivery Fleet ("Platform", "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy.',
      'If you are using the Platform on behalf of a business, you represent that you have authority to bind that business to these Terms.',
      'If you do not agree to these Terms, you may not access or use the Platform.',
      'We reserve the right to update these Terms at any time. Continued use of the Platform after changes constitutes acceptance.',
    ],
  },
  {
    title: '2. Description of Service',
    content: [
      'My Delivery Fleet provides a restaurant delivery management platform including: on-demand driver dispatch, branded customer tracking pages, delivery cost management, SMS marketing tools, and a savings calculator.',
      'We charge a flat per-delivery fee with no commissions on order value and no monthly subscription fees.',
      'We are a technology platform and logistics coordinator. We are not a food delivery marketplace and we do not list your restaurant to consumers.',
      'Service availability may vary by geographic region. We do not guarantee driver availability in all areas.',
    ],
  },
  {
    title: '3. Account Registration',
    content: [
      'You must create an account to use the Platform. You agree to provide accurate, current, and complete information during registration.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
      'You must notify us immediately at support@mydeliveryfleet.com if you suspect unauthorized access to your account.',
      'We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.',
      'You must be at least 18 years old and legally authorized to enter into contracts to use the Platform.',
    ],
  },
  {
    title: '4. Fees and Payment',
    content: [
      'Fees are charged on a weekly basis and invoiced accordingly. Failed or cancelled deliveries before driver pickup are not charged.',
      'You authorize us to charge your payment method on file for all fees reflected in your weekly invoice.',
      'All fees are exclusive of applicable taxes. You are responsible for any taxes applicable to your use of the Platform.',
      'We reserve the right to suspend service for accounts with overdue balances.',
    ],
  },
  {
    title: '5. Driver Services',
    content: [
      'On-demand drivers made available through our Platform are independent contractors, not employees of My Delivery Fleet.',
      'We do not guarantee specific delivery times. Estimated delivery windows are provided for reference only.',
      'You are responsible for ensuring orders are properly packaged and ready for pickup at the designated time.',
      'Delivery availability is subject to driver supply in your area. We will notify you if no driver is available for a dispatch.',
      'You may not use our Platform to dispatch drivers for deliveries of illegal goods or substances.',
    ],
  },
  {
    title: '6. Customer Data and Marketing',
    content: [
      'Customer data collected through our branded tracking pages (including marketing opt-ins) is owned by you, the restaurant.',
      'By using our SMS marketing tools, you represent that all customers you message have provided valid consent to receive marketing messages.',
      'You are solely responsible for the content of SMS campaigns sent through our platform and for compliance with applicable marketing laws (including the TCPA and CAN-SPAM Act).',
      'We provide the tools; you are the sender. We will not be liable for regulatory violations arising from your marketing campaigns.',
      'We may use aggregated, anonymized data from your account to improve our Platform.',
    ],
  },
  {
    title: '7. Acceptable Use',
    content: [
      'You agree not to use the Platform to: violate any applicable law or regulation; infringe the intellectual property rights of others; transmit harmful, fraudulent, or deceptive content; interfere with Platform operations or security.',
      'You may not reverse-engineer, decompile, or attempt to extract source code from our Platform.',
      'You may not resell or sublicense access to the Platform without our written consent.',
      'Automated scraping, crawling, or data extraction from the Platform is prohibited.',
      'Violation of acceptable use policies may result in immediate account suspension without refund.',
    ],
  },
  {
    title: '8. Intellectual Property',
    content: [
      'The Platform, including all software, algorithms, designs, text, and graphics, is owned by My Delivery Fleet and protected by copyright, trademark, and other laws.',
      'We grant you a limited, non-exclusive, non-transferable license to use the Platform for your internal business purposes.',
      'You retain ownership of your business data and customer data. You grant us a license to use this data solely to provide the Service.',
      'Any feedback or suggestions you provide may be used by us without obligation or compensation to you.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, My Delivery Fleet shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
      'Our total liability to you for any claim arising from use of the Platform shall not exceed the total fees you paid in the 3 months preceding the claim.',
      'We are not liable for losses arising from: driver unavailability, delivery delays, third-party service outages, or events outside our reasonable control.',
      'The Platform is provided "as is" without warranties of any kind, express or implied, including fitness for a particular purpose.',
    ],
  },
  {
    title: '10. Termination',
    content: [
      'You may terminate your account at any time via account settings or by contacting support@mydeliveryfleet.com.',
      'We may suspend or terminate your account immediately for material breach of these Terms, non-payment, or conduct harmful to our platform or other users.',
      'Upon termination, your right to access the Platform ceases immediately. Outstanding fees remain due.',
      'Provisions that by their nature should survive termination (including payment obligations, intellectual property, and limitation of liability) will survive.',
    ],
  },
  {
    title: '11. Governing Law',
    content: [
      'These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles.',
      'Any disputes arising from these Terms shall be resolved through binding arbitration under the rules of the American Arbitration Association.',
      'You waive any right to participate in class-action lawsuits or class-wide arbitration against My Delivery Fleet.',
      'Notwithstanding the above, either party may seek injunctive relief in a court of competent jurisdiction.',
    ],
  },
  {
    title: '12. Contact',
    content: [
      'For legal inquiries or questions about these Terms, please contact us:',
      'Email: support@mydeliveryfleet.com',
      'Address: My Delivery Fleet, Inc.',
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <Link href="/" className="text-sm text-text-2 hover:text-text-1 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <p className="text-sm font-medium text-[#1877F2] mb-2">Legal</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-1">Terms of Service</h1>
          <p className="mt-4 text-text-2 text-base sm:text-lg">
            Last updated: April 17, 2026
          </p>
          <p className="mt-4 text-text-2 text-base sm:text-lg max-w-3xl">
            Please read these Terms of Service carefully before using the My Delivery Fleet platform.
            These Terms govern your access to and use of our services.
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
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@mydeliveryfleet.com" className="text-[#1877F2] font-medium hover:underline">
              support@mydeliveryfleet.com
            </a>
            . You can also review our{' '}
            <Link href="/privacy" className="text-[#1877F2] font-medium hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}

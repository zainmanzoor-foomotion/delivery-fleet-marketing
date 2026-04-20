import Link from 'next/link'

const sections = [
  {
    title: '1. Legal Notice',
    content: [
      'This website and platform are operated by My Delivery Fleet, Inc. ("My Delivery Fleet", "we", "our", or "us").',
      'By accessing or using this website or our platform, you acknowledge that you have read, understood, and agree to be bound by the terms set out on this page and in our linked legal documents.',
      'If you do not agree, please discontinue use of this website and platform immediately.',
    ],
  },
  {
    title: '2. Copyright',
    content: [
      '© 2026 My Delivery Fleet, Inc. All rights reserved.',
      'All content on this website — including text, graphics, logos, icons, images, and software — is the property of My Delivery Fleet and is protected by applicable copyright and intellectual property laws.',
      'No part of this website may be reproduced, distributed, or transmitted in any form or by any means without our prior written permission.',
    ],
  },
  {
    title: '3. Trademarks',
    content: [
      '"My Delivery Fleet" and associated logos and product names are trademarks of My Delivery Fleet, Inc.',
      'All other trademarks, service marks, product names, and company names or logos mentioned on this website are the property of their respective owners.',
      'Nothing on this website grants any license or right to use any trademark without the prior written permission of the owner.',
    ],
  },
  {
    title: '4. Disclaimer of Warranties',
    content: [
      'This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.',
      'We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
      'We make no representations about the accuracy, completeness, or suitability of the information contained on this website for any purpose.',
    ],
  },
  {
    title: '5. Accuracy of Information',
    content: [
      'We make reasonable efforts to ensure that the information published on this website is accurate and up to date, but we make no guarantees of completeness or accuracy.',
      'Pricing, feature descriptions, availability, and other details on this website are subject to change without notice.',
      'Always refer to your account dashboard and official service communications for the most current information about your plan.',
    ],
  },
  {
    title: '6. No Professional Advice',
    content: [
      'Nothing on this website constitutes legal, financial, tax, or business advice.',
      'Any general information provided is for informational purposes only and should not be relied upon as a substitute for professional advice tailored to your specific circumstances.',
      'We recommend consulting a qualified professional before making decisions based on content found on this website.',
    ],
  },
  {
    title: '7. Amendments to This Notice',
    content: [
      'We may update this Legal Notice at any time without prior notice. Changes take effect as soon as they are published on this page.',
      'The "Last updated" date at the top of this page reflects when the most recent changes were made.',
      'We encourage you to review this page periodically to stay informed of any updates.',
    ],
  },
  {
    title: '8. Legal Documents',
    content: [
      'Our Privacy Policy describes how we collect, use, and protect your personal data.',
      'Our Terms of Service govern your use of the My Delivery Fleet platform and services.',
      'Both documents form part of the legal framework governing your relationship with us.',
    ],
  },
  {
    title: '9. Contact',
    content: [
      'For legal inquiries, please contact us at: support@mydeliveryfleet.com',
      'My Delivery Fleet, Inc.',
    ],
  },
]

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <Link href="/" className="text-sm text-text-2 hover:text-text-1 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <p className="text-sm font-medium text-[#1877F2] mb-2">My Delivery Fleet</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-1">Legal</h1>
          <p className="mt-4 text-text-2 text-base sm:text-lg">
            Last updated: April 17, 2026
          </p>
          <p className="mt-4 text-text-2 text-base sm:text-lg max-w-3xl">
            This page contains the general legal notices, disclaimers, and intellectual property
            information governing your use of the My Delivery Fleet website and platform.
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

        <div className="mt-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-6 flex flex-col gap-3">
          <p className="text-sm text-text-2">
            For legal inquiries, contact us at{' '}
            <a href="mailto:support@mydeliveryfleet.com" className="text-[#1877F2] font-medium hover:underline">
              support@mydeliveryfleet.com
            </a>
            .
          </p>
          <p className="text-sm text-text-2">
            Also see:{' '}
            <Link href="/privacy" className="text-[#1877F2] font-medium hover:underline">
              Privacy Policy
            </Link>
            {' '}and{' '}
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

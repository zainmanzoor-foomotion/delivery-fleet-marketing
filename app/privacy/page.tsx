import Link from 'next/link'

const sections = [
  {
    title: 'Collection of your Personal Information',
    paragraphs: [
      'My Delivery Fleet may collect personally identifiable information, such as your name. If you use My Delivery Fleet\'s products and services, we collect address, phone number, amount purchased, purchase details and primary email address information. This information is used to complete the delivery transaction. We may gather additional personal or non-personal information in the future.',
      'If you are a driver using our my driver app or My Delivery Fleet drive app, we collect location data, including background location, to track deliveries, geofencing and optimize routes. Location data is collected only when you are online or on shift. When you are offline or not actively delivering, My Delivery Fleet does not collect or store your location data.',
      'Information about your computer hardware and software may be automatically collected by My Delivery Fleet. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the My Delivery Fleet website.',
    ],
  },
  {
    title: 'Use of your Personal Information',
    paragraphs: [
      'My Delivery Fleet collects and uses your personal information to operate its website(s) and deliver the services you have requested. This includes using your phone number to send SMS notifications specifically to notify you in case of an emergency or similar urgent cases regarding the system. My Delivery Fleet may also use your personally identifiable information to inform you of other products or services available from My Delivery Fleet and its affiliates. My Delivery Fleet may also contact you via surveys to conduct research about your opinion of current services. My Delivery Fleet does not sell, rent or lease its customer lists to third parties.',
      'My Delivery Fleet may share data with trusted partners to help perform statistical analysis, send you email to provide customer support. All such third parties are prohibited from using your personal information except to provide these services to My Delivery Fleet, and they are required to maintain the confidentiality of your information.',
      'My Delivery Fleet may keep track of the websites and pages our users visit within My Delivery Fleet, in order to determine what My Delivery Fleet services are the most popular. This data is used to deliver customized content and advertising within My Delivery Fleet to customers whose behavior indicates that they are interested in a particular subject area.',
      'My Delivery Fleet will disclose your personal information, without notice, only if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on My Delivery Fleet or the site; (b) protect and defend the rights or property of My Delivery Fleet; and, (c) act under exigent circumstances to protect the personal safety of users of My Delivery Fleet, or the public.',
    ],
  },
  {
    title: 'Use of Cookies',
    paragraphs: [
      'The My Delivery Fleet website may use "cookies" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you.',
      'You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the My Delivery Fleet services or websites you visit.',
    ],
  },
  {
    title: 'Security of your Personal Information',
    paragraphs: [
      'Your personal information is extremely important to us. My Delivery Fleet secures your personal information from unauthorized access, use or disclosure. When personal information is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol. Although we try our best to protect your information, we cannot completely eliminate security risks associated with personal information.',
    ],
  },
  {
    title: 'Children Under Thirteen',
    paragraphs: [
      'My Delivery Fleet does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.',
    ],
  },
  {
    title: 'Opt-Out & Unsubscribe',
    paragraphs: [
      'We respect your privacy and give you an opportunity to opt-out of receiving announcements of certain information. Users may opt-out of receiving any or all communications from My Delivery Fleet by contacting us at http://www.My Delivery Fleet.com/',
    ],
  },
  {
    title: 'Changes to this Statement',
    paragraphs: [
      'My Delivery Fleet will occasionally update this Statement of Privacy to reflect company and customer feedback. My Delivery Fleet encourages you to periodically review this Statement to be informed of how My Delivery Fleet is protecting your information.',
    ],
  },
  {
    title: 'Contact Information',
    paragraphs: [
      'My Delivery Fleet welcomes your questions or comments regarding this Statement of Privacy. If you believe that My Delivery Fleet has not adhered to this Statement, please contact My Delivery Fleet at info@MyDeliveryFleet.com',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pt-10">
        <h1 className="text-3xl sm:text-[54px] font-bold text-text-1 mb-3">Privacy Policy</h1>
        <p className="text-sm sm:text-2xl text-text-2 mb-8">The Effective date of this Policy is April 12, 2025</p>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col gap-4 text-sm sm:text-base text-text-2 leading-relaxed">
          <p>
            Protecting your private information is our priority. This Statement of Privacy applies to the http://www.dashboard.My Delivery Fleet.com and My Delivery Fleet Inc. and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to My Delivery Fleet include http://www.My Delivery Fleet.com and My Delivery Fleet, Inc. The My Delivery Fleet website is a restaurant food delivery management site. By using the My Delivery Fleet website, you consent to the data practices described in this statement. This Privacy Policy applies to every My Delivery Fleet application, whether accessed directly or through a third party marketplace or platform (collectively, "Platforms").
          </p>
          <p>
            When a Merchant enables any Company application on a Platform, Company acts as a service provider/processor on behalf of that Merchant. In this role we:
          </p>
          <ol className="flex flex-col gap-1.5">
            {[
              'Collect only the data the Platform makes available or that the Merchant provides (e.g., order details and limited customer contact info).',
              'Use that data solely to deliver, secure, and improve the application.',
              'Disclose it only to the Merchant and to subprocessors and never for our own independent marketing purposes.',
              'Retain & secure the data.',
              'Honour data subject rights through the Merchant, who is the data controller.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0 font-medium text-text-2">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
          <p>
            By signing up, you agree to receive SMS messages from us for account verification, onboarding assistance, and updates necessary to help you set up and use your account. Message frequency may vary. Standard message and data rates may apply. You can opt out at any time by replying STOP.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-8">
          {sections.map(({ title, paragraphs }) => (
            <div key={title}>
              <h2 className="text-lg sm:text-xl font-bold text-text-1 mb-3">{title}</h2>
              <div className="flex flex-col gap-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-sm sm:text-base text-text-2 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}


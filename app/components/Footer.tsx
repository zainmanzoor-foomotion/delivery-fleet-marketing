'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const productLinks = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#calculator' },
  { label: 'Marketing', href: '#marketing' },
]

const companyLinks = [
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <footer className="w-full bg-[#FAFAFB]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-20">

        <div className="flex flex-col items-start gap-10 py-14 sm:flex-row sm:justify-between max-w-5xl">

          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={80}
                height={80}
                className="w-12 h-9.5"
                priority
              />
              <span className="text-xl sm:text-2xl font-extrabold italic text-text-1 font-cabinet">
                My Delivery Fleet
              </span>
            </Link>
            <p className="text-sm sm:text-md text-text-2 font-normal">
              Boost sales and cut costs with AI-powered On-Demand Drivers that expand your reach.
            </p>
          </div>

          <div className="flex gap-16 sm:gap-20">

            <div>
              <h3 className="mb-4 text-sm sm:text-md font-semibold text-text-1">Product</h3>
              <ul className="flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm sm:text-md text-text-2 hover:text-text-1 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm sm:text-md font-semibold text-text-1">Company</h3>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm sm:text-md text-text-2 hover:text-text-1 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-10 sm:flex-row items-center sm:justify-between">
          <p className="text-xs text-text-1">
            &copy; {new Date().getFullYear()} My Delivery Fleet. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-text-1 hover:text-text-2 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-text-1 hover:text-text-2 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

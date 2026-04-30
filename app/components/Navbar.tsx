'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navLinks = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Marketing', href: '#marketing' },
  { label: 'Calculator', href: '#calculator' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled((document.documentElement.scrollTop || document.body.scrollTop) > 40)
    onScroll()
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') return
    const target = sessionStorage.getItem('scrollTarget')
    if (!target) return
    sessionStorage.removeItem('scrollTarget')
    setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent, href: string, closeMobile = false) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    if (pathname === '/') {
      if (closeMobile) {
        setMobileOpen(false)
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 220)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      sessionStorage.setItem('scrollTarget', id)
      router.push('/')
    }
  }

  return (
    <header className={cn("h-20 sticky top-0 z-50 w-full bg-white transition-shadow", scrolled && "border-b border-[#E5E7EB]")}>
      <div className="mx-auto max-w-7xl h-[10vh] px-6 lg:px-10">
        <div className="flex h-full items-center justify-between">

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={80}
              height={80}
              className="w-8 h-8"
              priority
            />
            <span className="text-lg font-extrabold italic text-text-1 tracking-tight font-cabinet">
              My Delivery Fleet
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-md font-medium text-text-1 transition-colors hover:text-text-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href='https://app.mydeliveryfleet.com/sign-in' target='_blank'>
              <Button
                variant='ghost'
                className="transition-colors hover:text-text-2 text-md text-text-1 hover:bg-transparent">
                Login
              </Button>
            </a>
            <a href='https://app.mydeliveryfleet.com/sign-up' target='_blank'>
              <Button className="w-35 text-md px-6">
                Get Started
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden rounded-md p-3 text-text-1 hover:text-text-1/70 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-200',
          mobileOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0',
        )}
      >
        <nav className="flex flex-col gap-1 bg-white px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, true)}
              className="rounded-md px-3 py-2 text-sm font-medium text-text-1 hover:text-text-2 hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 pt-3">
            <a href='https://app.mydeliveryfleet.com/sign-in' target='_blank'>
              <Button variant='ghost' className="w-full px-3 py-2 text-sm text-text-1">
                Login
              </Button>
            </a>
            <a href='https://app.mydeliveryfleet.com/sign-up' target='_blank'>
              <Button className="w-full text-sm">
                Get Started
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

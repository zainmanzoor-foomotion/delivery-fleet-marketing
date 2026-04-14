'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Marketing', href: '#marketing' },
  { label: 'Calculator', href: '#calculator' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-25 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold text-text-1 tracking-tight italic">
              My Delivery Fleet
            </span>
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-md font-medium text-text-1 transition-colors hover:text-text-1/90"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant='ghost'
              className="text-md text-text-1 hover:bg-transparent">
              Login
            </Button>
            <Button
              className="w-35 text-md px-6"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden rounded-md p-2 text-text-1 hover:text-text-1/70 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
              className="rounded-md px-3 py-2 text-md font-medium text-text-1 hover:text-text-1/90 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 pt-3">
            <Button
              variant='ghost'
              className="w-full px-3 py-2 text-md text-text-1">
              Login
            </Button>
            <Button className="w-full text-md">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'

interface NavigationProps {
  activeSection: string
}

const navigationItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation({ activeSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className="text-2xl font-bold text-yellow-500 transition-colors hover:text-yellow-600"
          >
            Visal
          </Link>
          <div className="hidden space-x-6 md:flex">
            {navigationItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-yellow-500 ${
                  activeSection === item.href.substring(1)
                    ? 'font-medium text-yellow-500'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

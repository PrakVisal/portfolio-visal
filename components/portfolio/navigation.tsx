'use client'

import Link from 'next/link'
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string
}

const navigationItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation({ activeSection }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 z-50 w-full rounded-b-3xl bg-black shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className="text-2xl font-bold text-yellow-500 transition-colors hover:text-yellow-600"
          ></Link>
          {/* Desktop nav */}
          <div className="hidden space-x-12 md:flex">
            {navigationItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`text-2xl transition-colors hover:text-yellow-500 ${
                  activeSection === item.href.substring(1)
                    ? 'font-medium text-yellow-500'
                    : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          {/* Hamburger for mobile */}
          <button
            className="rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-7 w-7 text-yellow-500" />
          </button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col md:hidden">
          {/* Overlay bg with fade-in */}
          <div className="absolute inset-0 z-0 bg-black bg-opacity-90 opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex justify-end p-4">
              <button
                className="rounded bg-black p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-7 w-7 text-yellow-500" />
              </button>
            </div>
            <div className="animate-slideDownMenu flex flex-1 translate-y-0 flex-col items-center justify-center gap-8 rounded-b-2xl bg-black/35 transition-transform duration-300 ease-out">
              {navigationItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded px-4 py-2 text-3xl font-semibold transition-colors hover:text-yellow-500 ${
                    activeSection === item.href.substring(1) ? 'text-yellow-500' : 'text-white'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes slideDownMenu {
              0% {
                opacity: 0;
                transform: translateY(-40px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slideDownMenu {
              animation: slideDownMenu 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </div>
      )}
    </nav>
  )
}

"use client"

import Link from "next/link"

interface NavigationProps {
  activeSection: string
}

const navigationItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
]

export default function Navigation({ activeSection }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="#home" className="text-2xl font-bold text-yellow-500 hover:text-yellow-600 transition-colors">
            A
          </Link>
          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-yellow-500 transition-colors ${
                  activeSection === item.href.substring(1) ? "text-yellow-500 font-medium" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

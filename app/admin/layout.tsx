'use client'

import type React from 'react'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
        <Toaster />
      </div>
    </SessionProvider>
  )
}

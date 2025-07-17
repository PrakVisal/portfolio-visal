'use client'

import { Button } from '@/components/ui/button'
import { Bell, Search, Menu } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface AdminHeaderProps {
  title: string
  description?: string
  onMenuClick?: () => void
}

export default function AdminHeader({ title, description, onMenuClick }: AdminHeaderProps) {
  const { data: session } = useSession()

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Hamburger menu for mobile */}
          {onMenuClick && (
            <button className="md:hidden mr-2 p-2" onClick={onMenuClick} aria-label="Open sidebar">
              <Menu className="h-6 w-6 text-gray-900" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-600">Welcome, {session?.user?.name}</div>
        </div>
      </div>
    </div>
  )
}

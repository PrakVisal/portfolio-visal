'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  MessageSquare,
  User,
  FolderOpen,
  Settings,
  LogOut,
  BarChart3,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Contact Messages', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Portfolio Content', href: '/admin/portfolio', icon: User },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-yellow-600">Portfolio Admin</h1>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map(item => {
            const isActive = pathname === item.href
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border border-yellow-200 bg-yellow-100 text-yellow-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="mb-4 flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

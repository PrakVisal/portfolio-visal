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

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
    if (onClose) onClose()
  }
  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-lg">
      {/* Logo/Brand */}
      <div className="flex h-20 items-center justify-center border-b border-gray-200 bg-yellow-50">
        {/* <img src="/placeholder-logo.svg" alt="Logo" className="h-10 w-10 mr-2" /> */}
        <span className="text-2xl font-extrabold text-yellow-600 tracking-tight">Portfolio Admin</span>
      </div>
      {/* Navigation */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-6">
     
          <ul className="space-y-1">
            {navigation.map(item => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-yellow-100 text-yellow-700 shadow border border-yellow-300'
                        : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 hover:shadow-sm'
                    )}
                    onClick={onClose}
                  >
                    <item.icon className={cn('h-5 w-5', isActive ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-600')} />
                    <span>{item.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-200" />
        {/* User Info & Sign Out */}
        <div className="p-4">
          <div className="mb-4 flex items-center gap-3">
            <img src={typeof session?.user === 'object' && 'image' in session.user && typeof session.user.image === 'string' && session.user.image ? session.user.image : '/placeholder-user.jpg'} alt="User" className="h-10 w-10 rounded-full border object-cover" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">{session?.user?.name}</p>
              <p className="truncate text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            size="sm"
            className="w-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

interface AdminSidebarProps {
  onClose?: () => void;
  className?: string;
}

export default function AdminSidebar({ onClose, className }: AdminSidebarProps) {
  return (
    <div className={cn('h-full', className)}>
      <SidebarContent onClose={onClose} />
    </div>
  )
}

'use client'

import AdminHeader from '@/components/admin/header'
import AdminSidebar from '@/components/admin/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MessageSquare, Users, FolderOpen, TrendingUp } from 'lucide-react'
import LoadingSpinner from '@/components/portfolio/loading-spinner'
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'

interface DashboardStats {
  totalContacts: number
  unreadContacts: number
  totalProjects: number
  recentActivity: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    unreadContacts: 0,
    totalProjects: 0,
    recentActivity: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactsRes, projectsRes] = await Promise.all([
          fetch('/api/admin/stats/contacts'),
          fetch('/api/admin/stats/projects'),
        ])

        const contactsData = await contactsRes.json()
        const projectsData = await projectsRes.json()

        setStats({
          totalContacts: contactsData.total || 0,
          unreadContacts: contactsData.unread || 0,
          totalProjects: projectsData.total || 0,
          recentActivity: contactsData.recent || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchStats()
    }
  }, [session])

  if (status === 'loading') {
    return <>
    <center>
      <LoadingSpinner/>
    </center>
    </>
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <AdminSidebar className="hidden md:block" />
      {/* Mobile Sidebar Drawer */}
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
  <DrawerContent className="md:hidden p-0 w-64">
    <AdminSidebar onClose={() => setSidebarOpen(false)} className="block md:hidden h-full" />
  </DrawerContent>
</Drawer>
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader title="Dashboard" description="Welcome to your portfolio admin panel" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold justify-content-center">{isLoading ? '...' : stats.totalContacts}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.unreadContacts} unread messages
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? '...' : stats.unreadContacts}</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold justify-center align-content-center">{isLoading ? '...' : stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">In portfolio</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? '...' : stats.recentActivity}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Messages</CardTitle>
                <CardDescription>Latest messages from your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">Loading recent messages...</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button className="w-full rounded-lg p-3 text-left transition-colors hover:bg-gray-100">
                    <div className="font-medium">Update Portfolio Content</div>
                    <div className="text-sm text-gray-500">Edit your personal information</div>
                  </button>
                  <button className="w-full rounded-lg p-3 text-left transition-colors hover:bg-gray-100">
                    <div className="font-medium">Add New Project</div>
                    <div className="text-sm text-gray-500">Showcase your latest work</div>
                  </button>
                  <button className="w-full rounded-lg p-3 text-left transition-colors hover:bg-gray-100">
                    <div className="font-medium">View Analytics</div>
                    <div className="text-sm text-gray-500">Check portfolio performance</div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

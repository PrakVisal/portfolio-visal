'use client'

import type React from 'react'

import AdminHeader from '@/components/admin/header'
import AdminSidebar from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import type { Portfolio } from '@/lib/types'
import { Save } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'

export default function PortfolioPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchPortfolioData()
    }
  }, [session])

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const result = await response.json()

      if (result.success) {
        setPortfolioData(result.data)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolio data',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!portfolioData) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Portfolio updated successfully',
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update portfolio',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (!portfolioData) return

    if (field.startsWith('socialLinks.')) {
      const socialField = field.split('.')[1]
      setPortfolioData({
        ...portfolioData,
        socialLinks: {
          ...portfolioData.socialLinks,
          [socialField]: value,
        },
      })
    } else {
      setPortfolioData({
        ...portfolioData,
        [field]: value,
      })
    }
  }

  if (status === 'loading' || isLoading) {
    return <div>Loading...</div>
  }

  if (!session || !portfolioData) {
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
        <AdminHeader
          title="Portfolio Content"
          description="Update your personal information and social links"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your basic information displayed on the portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={portfolioData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={portfolioData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    placeholder="e.g., UI/UX Designer, Flutter Developer"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={portfolioData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={portfolioData.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Update your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={portfolioData.socialLinks.instagram || ""}
                    onChange={e => handleInputChange('socialLinks.instagram', e.target.value)}
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={portfolioData.socialLinks.facebook || ""}
                    onChange={e => handleInputChange('socialLinks.facebook', e.target.value)}
                    placeholder="https://facebook.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={portfolioData.socialLinks.twitter || ""}
                    onChange={e => handleInputChange('socialLinks.twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="youtube">YouTube URL</Label>
                  <Input
                    id="youtube"
                    type="url"
                    value={portfolioData.socialLinks.youtube || ""}
                    onChange={e => handleInputChange('socialLinks.youtube', e.target.value)}
                    placeholder="https://youtube.com/channel/..."
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

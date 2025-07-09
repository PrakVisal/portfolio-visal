export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string>
  timestamp: string
}

export interface ContactSubmission {
  id: number
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  createdAt: Date
  isRead: boolean
  isReplied: boolean
}

export interface PortfolioData {
  id: number
  name: string
  title: string
  description: string
  location: string
  socialLinks: {
    instagram: string
    facebook: string
    twitter: string
    youtube: string
  }
  updatedAt: Date
}

export interface ProjectData {
  id: number
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  createdAt: Date
}

// NextAuth types extension
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}

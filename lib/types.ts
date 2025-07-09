export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface PortfolioData {
  id?: number
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  website: string
  github: string
  linkedin: string
  twitter: string
  instagram: string
  created_at?: Date
  updated_at?: Date
}

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured: boolean
  created_at: Date
  updated_at: Date
}

export interface Skill {
  id: number
  name: string
  category: string
  proficiency: number
  created_at: Date
  updated_at: Date
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  created_at: Date
  updated_at: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
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

'use client'

import { useEffect, useState } from 'react'

export interface Skill {
  id: number
  name: string
  category: string
  proficiency_level: string
  display_order: number
  created_at: string
}

export function useSkillsData(category?: string) {
  const [skills, setSkills] = useState<Record<string, Skill[]> | Skill[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const params = category ? `?category=${encodeURIComponent(category)}` : ''
        const response = await fetch(`/api/skills${params}`)
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setSkills(result.data)
          } else {
            throw new Error(result.message)
          }
        } else {
          throw new Error('Failed to fetch skills data')
        }
      } catch (error) {
        console.error('Failed to fetch skills data:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
        setSkills(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [category])

  return { skills, isLoading, error }
}

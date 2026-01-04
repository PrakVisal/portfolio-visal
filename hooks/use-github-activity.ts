'use client'

import { useEffect, useState } from 'react'

export interface GitHubContribution {
  date: string
  count: number
  level: number
}

export interface GitHubActivityData {
  totalContributions: number
  contributions: GitHubContribution[]
  currentStreak: number
  longestStreak: number
}

export function useGitHubActivity(year?: number) {
  const [activityData, setActivityData] = useState<GitHubActivityData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const url = year 
          ? `/api/github/contributions?year=${year}`
          : '/api/github/contributions'
        
        console.log('Fetching GitHub activity data...', year ? `for year ${year}` : '')
        const response = await fetch(url)
        const result = await response.json()
        
        console.log('GitHub API response:', { 
          ok: response.ok, 
          success: result.success, 
          status: response.status,
          message: result.message 
        })
        
        if (response.ok && result.success) {
          setActivityData(result.data)
          setError(null)
        } else {
          const errorMessage = result.message || `HTTP ${response.status}: Failed to fetch GitHub activity`
          console.error('GitHub API error:', errorMessage)
          setError(errorMessage)
          // Set empty data on error
          setActivityData({
            totalContributions: 0,
            contributions: [],
            currentStreak: 0,
            longestStreak: 0,
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error('Failed to fetch GitHub activity:', errorMessage, error)
        setError(errorMessage)
        // Set empty data on error
        setActivityData({
          totalContributions: 0,
          contributions: [],
          currentStreak: 0,
          longestStreak: 0,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivityData()
  }, [year])

  return { activityData, isLoading, error }
}


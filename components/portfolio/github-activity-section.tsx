'use client'

import { useGitHubActivity, GitHubContribution } from '@/hooks/use-github-activity'
import { Github, TrendingUp, Flame, Calendar } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// GitHub username - should be set in environment variable NEXT_PUBLIC_GITHUB_USERNAME
// For server-side, use GITHUB_USERNAME
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || process.env.GITHUB_USERNAME || 'PrakVisal'

// Generate available years (GitHub started in 2008)
const getAvailableYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= 2008; year--) {
    years.push(year)
  }
  return years
}

export default function GitHubActivitySection() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const { activityData, isLoading, error } = useGitHubActivity(selectedYear)
  const availableYears = useMemo(() => getAvailableYears(), [])

  // Group contributions by week for display (7 days per week, starting from Sunday)
  const weeklyContributions = useMemo(() => {
    if (!activityData?.contributions || activityData.contributions.length === 0) return []

    const weeks: GitHubContribution[][] = []
    let currentWeek: GitHubContribution[] = []

    // Find the first day of the first week (should be a Sunday)
    const firstDate = new Date(activityData.contributions[0].date)
    const firstDayOfWeek = firstDate.getDay() // 0 = Sunday

    // Pad the first week if it doesn't start on Sunday
    if (firstDayOfWeek !== 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        const padDate = new Date(firstDate)
        padDate.setDate(padDate.getDate() - (firstDayOfWeek - i))
        currentWeek.push({
          date: padDate.toISOString().split('T')[0],
          count: 0,
          level: 0,
        })
      }
    }

    activityData.contributions.forEach((contribution, index) => {
      const date = new Date(contribution.date)
      const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday

      currentWeek.push(contribution)

      // If it's Saturday (end of week) or last contribution, push the week
      if (dayOfWeek === 6 || index === activityData.contributions.length - 1) {
        // Pad week to 7 days if needed (for incomplete weeks at the end)
        while (currentWeek.length < 7 && index === activityData.contributions.length - 1) {
          const lastDate = new Date(currentWeek[currentWeek.length - 1].date)
          lastDate.setDate(lastDate.getDate() + 1)
          currentWeek.push({
            date: lastDate.toISOString().split('T')[0],
            count: 0,
            level: 0,
          })
        }
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })

    return weeks
  }, [activityData])

  // Get contribution level color (similar to GitHub's color scheme)
  const getContributionColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-gray-100 dark:bg-gray-800'
      case 1:
        return 'bg-green-200 dark:bg-green-900'
      case 2:
        return 'bg-green-400 dark:bg-green-700'
      case 3:
        return 'bg-green-600 dark:bg-green-600'
      case 4:
        return 'bg-green-800 dark:bg-green-500'
      default:
        return 'bg-gray-100 dark:bg-gray-800'
    }
  }

  if (isLoading) {
    return (
      <section id="github" className="relative overflow-hidden bg-white dark:bg-gray-900 px-4 py-20 md:py-28 transition-colors">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg animate-pulse">
              <Github className="h-10 w-10 text-black dark:text-gray-900" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading GitHub activity...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="github" className="relative overflow-hidden bg-white dark:bg-gray-900 px-4 py-20 md:py-28 transition-colors">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg">
              <Github className="h-10 w-10 text-black dark:text-gray-900" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4">
              GitHub Activity
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto mb-6">
              <p className="text-red-800 dark:text-red-300 font-semibold mb-2">Unable to fetch GitHub data</p>
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-gray-800 text-yellow-400 dark:text-yellow-300 rounded-full font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-500 hover:text-black dark:hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Github className="h-5 w-5" />
              View GitHub Profile
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="relative overflow-hidden bg-white dark:bg-gray-900 px-4 py-20 md:py-28 transition-colors">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg">
            <Github className="h-10 w-10 text-black dark:text-gray-900" />
          </div>
          <p className="mb-3 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
            Check out my coding activity and contributions!
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-2">
            GitHub Activity
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Stats Cards */}
        {activityData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-2xl p-6 shadow-lg border-2 border-black dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-black dark:text-gray-900" />
                <h3 className="text-lg font-bold text-black dark:text-gray-900">Total Contributions</h3>
              </div>
              <p className="text-3xl font-black text-black dark:text-gray-900">
                {activityData.totalContributions.toLocaleString()}
              </p>
              <p className="text-sm text-black/70 dark:text-gray-900/70 mt-1">For {selectedYear}</p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 rounded-2xl p-6 shadow-lg border-2 border-black dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="h-6 w-6 text-black dark:text-gray-900" />
                <h3 className="text-lg font-bold text-black dark:text-gray-900">Current Streak</h3>
              </div>
              <p className="text-3xl font-black text-black dark:text-gray-900">
                {activityData.currentStreak} days
              </p>
              <p className="text-sm text-black/70 dark:text-gray-900/70 mt-1">
                {selectedYear === new Date().getFullYear() ? 'Days in a row' : `In ${selectedYear}`}
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600 rounded-2xl p-6 shadow-lg border-2 border-black dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-6 w-6 text-black dark:text-gray-900" />
                <h3 className="text-lg font-bold text-black dark:text-gray-900">Longest Streak</h3>
              </div>
              <p className="text-3xl font-black text-black dark:text-gray-900">
                {activityData.longestStreak} days
              </p>
              <p className="text-sm text-black/70 dark:text-gray-900/70 mt-1">Best streak in {selectedYear}</p>
            </div>
          </div>
        )}

        {/* Contributions Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border-2 border-black dark:border-gray-700 transition-colors">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Contribution Graph</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Showing contributions for {selectedYear}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="year-select" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Filter by Year:
              </label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value, 10))}
              >
                <SelectTrigger
                  id="year-select"
                  className="w-[140px] bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600 hover:border-yellow-400 dark:hover:border-yellow-500 focus:border-yellow-400 dark:focus:border-yellow-500 text-black dark:text-white"
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {activityData && activityData.contributions.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="flex gap-1 justify-center min-w-max">
                {weeklyContributions.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((contribution, dayIndex) => {
                      const date = new Date(contribution.date)
                      const tooltip = `${contribution.count} contributions on ${date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}`

                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-3 h-3 rounded-sm ${getContributionColor(contribution.level)} border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-125 hover:border-black dark:hover:border-white cursor-pointer`}
                          title={tooltip}
                          aria-label={tooltip}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No contribution data available</p>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-semibold"
              >
                <Github className="h-5 w-5" />
                View GitHub Profile
              </a>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-200 border border-gray-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400 border border-gray-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-600 border border-gray-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-800 border border-gray-200"></div>
            </div>
            <span>More</span>
          </div>

          {/* GitHub Profile Link */}
          <div className="mt-8 text-center">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-gray-700 text-yellow-400 dark:text-yellow-300 rounded-full font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-500 hover:text-black dark:hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Github className="h-5 w-5" />
              View Full GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


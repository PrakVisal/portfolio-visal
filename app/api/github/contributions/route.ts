import { NextResponse } from 'next/server'

interface GitHubContribution {
  date: string
  count: number
  level: number
}

interface GitHubContributionsResponse {
  totalContributions: number
  contributions: GitHubContribution[]
  currentStreak: number
  longestStreak: number
}

// GitHub username - can be moved to environment variable
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'PrakVisal'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const yearParam = searchParams.get('year')
    
    // Parse year or default to current year
    let targetYear = new Date().getFullYear()
    if (yearParam) {
      const parsedYear = parseInt(yearParam, 10)
      if (!isNaN(parsedYear) && parsedYear >= 2008 && parsedYear <= new Date().getFullYear()) {
        targetYear = parsedYear
      }
    }
    
    console.log(`Fetching GitHub contributions for user: ${GITHUB_USERNAME}, year: ${targetYear}`)
    
    // Set date range for the selected year
    const startDate = new Date(targetYear, 0, 1) // January 1st of the year
    const endDate = new Date(targetYear, 11, 31, 23, 59, 59) // December 31st of the year
    
    // If it's the current year, end date should be today
    if (targetYear === new Date().getFullYear()) {
      endDate.setTime(Date.now())
    }

    // Try using GitHub's GraphQL API first (more accurate)
    if (process.env.GITHUB_TOKEN) {
      try {
        // Format dates for GraphQL (YYYY-MM-DD format)
        const fromDate = startDate.toISOString().split('T')[0]
        const toDate = endDate.toISOString().split('T')[0]
        
        const graphqlQuery = {
          query: `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  totalCommitContributions
                  totalIssueContributions
                  totalPullRequestContributions
                  totalPullRequestReviewContributions
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                        color
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            username: GITHUB_USERNAME,
            from: startDate.toISOString(),
            to: endDate.toISOString(),
          },
        }

        const graphqlResponse = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
          body: JSON.stringify(graphqlQuery),
          next: { revalidate: 3600 },
        })

        if (graphqlResponse.ok) {
          const graphqlData = await graphqlResponse.json()
          
          if (graphqlData.errors) {
            console.error('GraphQL errors:', graphqlData.errors)
            throw new Error(graphqlData.errors[0]?.message || 'GraphQL query failed')
          }

          if (graphqlData.data?.user?.contributionsCollection) {
            const collection = graphqlData.data.user.contributionsCollection
            const contributions: GitHubContribution[] = []
            
            // Flatten weeks into daily contributions
            collection.contributionCalendar.weeks.forEach((week: any) => {
              week.contributionDays.forEach((day: any) => {
                const count = day.contributionCount
                let level = 0
                if (count > 0) level = 1
                if (count > 3) level = 2
                if (count > 7) level = 3
                if (count > 15) level = 4

                contributions.push({
                  date: day.date,
                  count,
                  level,
                })
              })
            })

            // Calculate streaks
            let currentStreak = 0
            let longestStreak = 0
            let tempStreak = 0

            for (let i = contributions.length - 1; i >= 0; i--) {
              if (contributions[i].count > 0) {
                tempStreak++
                if (i === contributions.length - 1) {
                  currentStreak = tempStreak
                }
                longestStreak = Math.max(longestStreak, tempStreak)
              } else {
                tempStreak = 0
              }
            }

            const result: GitHubContributionsResponse = {
              totalContributions: collection.contributionCalendar.totalContributions,
              contributions,
              currentStreak,
              longestStreak,
            }

            console.log(`Successfully fetched ${result.totalContributions} contributions via GraphQL`)
            return NextResponse.json({ success: true, data: result })
          }
        }
      } catch (graphqlError) {
        console.warn('GraphQL API failed, falling back to REST API:', graphqlError)
      }
    }

    // First, verify the user exists
    const userCheckResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }
    )

    if (!userCheckResponse.ok) {
      if (userCheckResponse.status === 404) {
        throw new Error(`GitHub user "${GITHUB_USERNAME}" not found. Please check the username.`)
      }
      const errorText = await userCheckResponse.text()
      throw new Error(`GitHub API error: ${userCheckResponse.status} - ${errorText}`)
    }

    // Fallback to REST API using events
    console.log('Using REST API fallback method')
    const contributionsMap = new Map<string, number>()
    let page = 1
    const maxPages = 10
    let hasEvents = false

    while (page <= maxPages) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`GitHub API error (page ${page}):`, response.status, errorText)
        if (page === 1) {
          // If first page fails, it might be rate limiting or other issue
          console.warn('First page failed, but continuing with empty data')
          break
        }
        break // Stop if we hit an error on subsequent pages
      }

      const events = await response.json()

      if (events.length === 0) {
        break // No more events
      }

      hasEvents = true

      // Process events to create contribution data
      events.forEach((event: any) => {
        if (event.type === 'PushEvent') {
          const eventDate = new Date(event.created_at)
          // Only count events from the last year
          if (eventDate >= startDate) {
            const date = eventDate.toISOString().split('T')[0]
            const count = event.payload.commits?.length || 0
            contributionsMap.set(date, (contributionsMap.get(date) || 0) + count)
          }
        }
      })

      // If the oldest event is before our start date, we can stop
      const oldestEvent = events[events.length - 1]
      if (oldestEvent && new Date(oldestEvent.created_at) < startDate) {
        break
      }

      page++
    }
    
    console.log(`Found ${contributionsMap.size} days with contributions (hasEvents: ${hasEvents})`)
    
    // If no events were found, log a warning but continue with empty data
    if (!hasEvents && page === 1) {
      console.warn(`No public events found for user ${GITHUB_USERNAME}. This might be because:`)
      console.warn('1. The user has no public activity')
      console.warn('2. The user has private repositories only')
      console.warn('3. Rate limiting is in effect')
    }

    // Generate contributions array for the last year
    const contributions: GitHubContribution[] = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const count = contributionsMap.get(dateStr) || 0
      
      // Determine level based on count (0-4 scale like GitHub)
      let level = 0
      if (count > 0) level = 1
      if (count > 3) level = 2
      if (count > 7) level = 3
      if (count > 15) level = 4

      contributions.push({
        date: dateStr,
        count,
        level,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Calculate streaks
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        tempStreak++
        if (i === contributions.length - 1) {
          currentStreak = tempStreak
        }
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }

    const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0)

    const result: GitHubContributionsResponse = {
      totalContributions,
      contributions,
      currentStreak,
      longestStreak,
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    
    // Return empty data structure on error
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch GitHub contributions',
        data: {
          totalContributions: 0,
          contributions: [],
          currentStreak: 0,
          longestStreak: 0,
        },
      },
      { status: 500 }
    )
  }
}


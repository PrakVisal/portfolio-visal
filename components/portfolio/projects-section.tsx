"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



interface Project {
  id: number
  title: string
  description: string
  image_url?: string
  technologies?: string
  github_url?: string
  live_url?: string
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="projects" className="bg-gray-50 px-4 py-16">
        <div className="container mx-auto text-center">Loading projects...</div>
      </section>
    )
  }

  return (
    <section id="projects" className="bg-gray-50 px-4 py-16">
      <div className="container mx-auto">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Projects</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center leading-relaxed text-gray-600">
          Explore some of my recent work, featuring a blend of design, development, and innovation.
        </p>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {projects.map(project => (
            <Card key={project.id} className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="p-0">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <CardTitle className="text-gray-900">{project.title}</CardTitle>
                  <CardDescription className="mb-4 text-base leading-relaxed text-gray-600">
                    {project.description}
                  </CardDescription>
                  {project.technologies && (
                    <div className="mb-4 text-sm text-gray-500">
                      <span className="font-semibold">Technologies:</span> {project.technologies}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {project.github_url && (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button asChild variant="default" size="sm">
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">Live Site</a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"

interface Project {
  id: number
  title: string
  description: string
  image_url?: string
  technologies?: string
  github_url?: string
  live_url?: string
  color?: string
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

  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Ease Ticket',
      description: 'Online Ticket Booking System',
      image_url: 'Home.jpg',
      technologies: 'Next.js, Spring Boot, PostgreSQL',
      github_url: undefined,
      live_url: undefined,
      color: 'bg-purple-800',
    },
    {
      id: 2,
      title: 'HRD Portal',
      description: 'School Management Website',
      image_url: 'hrdportal.png',
      technologies: 'Next.js, Spring Boot, PostgreSQL',
      github_url: undefined,
      live_url: undefined,
      color: 'bg-blue-800',
    },
  ]

  if (loading) {
    return (
      <section id="projects" className="bg-gray-50 px-4 py-16">
        <div className="container mx-auto text-center">Loading projects...</div>
      </section>
    )
  }

  return (
    <section id="projects" className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Projects</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center leading-relaxed text-gray-600">
          Explore some of my recent work, featuring a blend of design, development, and innovation.
        </p>
      </div>
      <ScrollStack
        useWindowScroll={true}
        itemDistance={150}
        itemScale={0.05}
        itemStackDistance={40}
        stackPosition="30%"
        scaleEndPosition="15%"
        baseScale={0.9}
        rotationAmount={2}
        blurAmount={2}
        className="w-full"
      >
        {projectsData.map(project => (
          <ScrollStackItem key={project.id} itemClassName={`${project.color} overflow-hidden p-0`}>
            <div className="relative h-full w-full rounded-[40px] overflow-hidden">
              {/* Background Image */}
              <img
                src={`/${project.image_url}`}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover rounded-[40px]"
                loading="lazy"
                decoding="async"
              />
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[40px]" />
              
              {/* Content Overlay */}
              <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
                <h3 className="mb-2 text-3xl font-bold drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="mb-4 text-lg leading-relaxed text-gray-100 drop-shadow-md">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="mb-4 text-sm text-gray-200">
                    <span className="font-semibold">Technologies:</span> {project.technologies}
                  </div>
                )}
                <div className="flex gap-3">
                  {project.github_url && (
                    <Button asChild variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.live_url && (
                    <Button asChild variant="default" size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        Live Site
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
} 
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import { FolderKanban } from "lucide-react"

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
      color: 'bg-purple-300',
    },
    {
      id: 2,
      title: 'HRD Portal',
      description: 'School Management Website',
      image_url: 'hrdportal.png',
      technologies: 'Next.js, Spring Boot, PostgreSQL',
      github_url: undefined,
      live_url: undefined,
      color: 'bg-blue-300',
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
    <section id="projects" className="relative overflow-hidden bg-white px-4 py-20 md:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-yellow-400 shadow-lg">
            <FolderKanban className="h-10 w-10 text-black" />
          </div>
          <p className="mb-3 text-lg md:text-xl text-gray-600 font-medium">
            Check out some of my recent work and creative projects!
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-black mb-2">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-teal-400 mx-auto rounded-full"></div>
        </div>
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
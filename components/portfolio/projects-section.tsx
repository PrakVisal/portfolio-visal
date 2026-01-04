"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import { FolderKanban } from "lucide-react"
import React from "react"

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

// Memoized project card component
const ProjectCard = React.memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <ScrollStackItem key={project.id} itemClassName={`${project.color} overflow-hidden p-0`}>
      <div className="relative h-full w-full rounded-[40px] overflow-hidden">
        {/* Background Image - Using Next.js Image for optimization */}
        {project.image_url && (
          <Image
            src={`/${project.image_url}`}
            alt={project.title}
            fill
            className="object-cover rounded-[40px]"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
        )}
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[40px]" />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4 md:p-8 text-white">
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
  )
})

ProjectCard.displayName = 'ProjectCard'

export default function ProjectsSection() {
  // Use useMemo to prevent recreating array on every render
  const projectsData: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Ease Ticket',
      description: 'Online Ticket Booking System',
      image_url: 'Home.jpg',
      technologies: 'Next.js, Spring Boot, PostgreSQL',
      github_url: undefined,
      live_url: undefined,
      color: 'bg-gray-100',
    },
    {
      id: 2,
      title: 'HRD Portal',
      description: 'School Management Website',
      image_url: 'hrdportal.png',
      technologies: 'Next.js, Spring Boot, PostgreSQL',
      github_url: undefined,
      live_url: undefined,
      color: 'bg-gray-100',
    },
  ], [])

  return (
    <section id="projects" className="relative overflow-hidden bg-white dark:bg-gray-900 px-2 md:px-4 py-20 md:py-28 transition-colors">
      {/* Animated background elements - Reduced blur intensity for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 dark:bg-yellow-400/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg">
            <FolderKanban className="h-10 w-10 text-black dark:text-gray-900" />
          </div>
          <p className="mb-3 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
            Check out some of my recent work and creative projects!
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-2">
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
        blurAmount={1}
        className="w-full"
      >
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ScrollStack>
    </section>
  )
} 
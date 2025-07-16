'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Globe,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Portfolio() {
  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'Docker',
    'Git',
  ]

  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      image: '/placeholder.svg?height=200&width=300',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      github: '#',
      live: '#',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative project management tool with real-time updates, team collaboration, and progress tracking.',
      image: '/placeholder.svg?height=200&width=300',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      github: '#',
      live: '#',
    },
    {
      title: 'Weather Dashboard',
      description:
        'A responsive weather application with location-based forecasts, interactive maps, and weather alerts.',
      image: '/placeholder.svg?height=200&width=300',
      technologies: ['React', 'API Integration', 'Chart.js', 'CSS'],
      github: '#',
      live: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">John Doe</h1>
            <div className="hidden space-x-6 md:flex">
              <Link href="#about" className="transition-colors hover:text-primary">
                About
              </Link>
              <Link href="#skills" className="transition-colors hover:text-primary">
                Skills
              </Link>
              <Link href="#projects" className="transition-colors hover:text-primary">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-20">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=150&width=150"
              alt="Profile"
              width={150}
              height={150}
              className="mx-auto mb-6 rounded-full border-4 border-primary/20"
            />
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Hi, I'm <span className="text-primary">John Doe</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl">
              Full Stack Developer passionate about creating beautiful, functional web applications
            </p>
            <div className="mb-8 flex justify-center space-x-4">
              <Button asChild>
                <Link href="#contact">Get In Touch</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-muted/50 px-4 py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">About Me</h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-6 text-lg">
                I'm a passionate full-stack developer with over 5 years of experience creating
                digital solutions that make a difference. I love turning complex problems into
                simple, beautiful designs.
              </p>
              <p className="mb-6 text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>Clean Code</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <span>UI/UX Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span>Mobile First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Web Standards</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="About me"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-4 py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">Skills & Technologies</h2>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-muted/50 px-4 py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.github}>
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={project.live}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 py-16">
        <div className="container mx-auto max-w-2xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Get In Touch</h2>
          <Card>
            <CardHeader>
              <CardTitle>Let's work together</CardTitle>
              <CardDescription>
                I'm always interested in new opportunities and exciting projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Project inquiry" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell me about your project..." rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 px-4 py-8">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 John Doe. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

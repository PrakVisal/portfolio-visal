'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  Hand, 
  Palette, 
  Zap, 
  Code, 
  Rocket, 
  Puzzle, 
  Sparkles, 
  Briefcase, 
  FileText, 
  PartyPopper,
  GraduationCap
} from 'lucide-react'

interface AboutSectionProps {
  portfolioData: {
    description: string
    image_url?: string
    name?: string
    title?: string
    email?: string
  }
  onDownloadCV: () => void
}

const skills = [
  { name: 'UI/UX Design', color: 'bg-yellow-400', icon: Palette },
  { name: 'Backend Dev', color: 'bg-yellow-400', icon: Zap },
  { name: 'Frontend', color: 'bg-yellow-400', icon: Code },
  { name: 'Full Stack', color: 'bg-yellow-400', icon: Rocket },
  { name: 'Problem Solving', color: 'bg-yellow-400', icon: Puzzle },
  { name: 'Creative', color: 'bg-yellow-400', icon: Sparkles },
]

const educationData = [
  {
    year: '2025 - 2026',
    institution: 'Korea Software HRD Center',
    courses: [
      {
        name: 'Advanced Course',
        description: [
          'SPRING Microservices: ORM with JPA and Hibernate, Spring Data JPA, OAuth2 Authentication, Spring Cloud, Service Discovery, API Gateway, Config Server, Load Balancer, Message Queue, Service Resiliency, and Service Availability'
        ]
      },
      {
        name: 'Basic Course',
        description: [
          'JAVA: J2SE (Basic Java and OOP concepts), J2EE (Maven and MVC pattern)',
          'WEB: HTML, CSS, JavaScript, CSS Flexbox, Tailwind CSS, JSON, Next.js',
          'SPRING: Spring Boot, MyBatis Data Access, Spring RESTful Web Service, Spring Security, JSON Web Token',
          'Database: Data Modeling, PostgreSQL, SQL (Basic SQL)',
          'Additional Courses: Linux, Docker, Version Control (GitHub) and UI/UX'
        ]
      }
    ]
  },
  {
    year: '2024 - 2025',
    institution: 'Sala IT',
    courses: [
      {
        name: 'Flutter Development',
        description: [
          'There are a lot of courses here, and I chose to study the Flutter Development course so I can experiment with Dart programming and building mobile app UI.'
        ]
      }
    ]
  },
  {
    year: '2023 - 2024',
    institution: 'ETEC CENTER',
    courses: [
      {
        name: 'Basic Programming',
        description: [
          'I got basic knowledge of programming like C, C++, and Basic Java'
        ]
      }
    ]
  }
]

export default function AboutSection({ portfolioData, onDownloadCV }: AboutSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-teal-400 to-teal-500 dark:from-teal-600 dark:to-teal-700 px-4 py-20 md:py-32 transition-colors">
      {/* Gradient background overlay - Removed animate-pulse for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-400 dark:from-teal-600 dark:via-teal-700 dark:to-teal-600 opacity-30 dark:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-300 via-teal-400 to-teal-500 dark:from-teal-500 dark:via-teal-600 dark:to-teal-700 opacity-20 dark:opacity-30" />
      
      <div className="container relative z-10 mx-auto">
        {/* Header with animated icon */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black text-black dark:text-white md:text-7xl">
            About Me
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-200" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Profile Photo + Content */}
          <div className="order-2 lg:order-1">
            {/* Profile Photo Section */}
            <div className="relative mb-12">
              <div className="relative mx-auto max-w-sm">
                {/* Floating decorative elements - Removed animate-pulse for performance */}
                <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 opacity-60 blur-xl" />
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 opacity-60 blur-xl" />
                
                {/* Main photo container with creative border */}
                <div className="relative">
                  <div className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-br from-teal-400 to-black opacity-50 blur-sm" />
                  <div className="relative overflow-hidden rounded-3xl border-4 border-black bg-white p-2 shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="relative aspect-square overflow-hidden rounded-2xl">
                      <Image
                        src={portfolioData.image_url || 'pf.jpg'}
                        alt={portfolioData.name || 'Profile'}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 animate-bounce">
                  <div className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-yellow-400 shadow-lg">
                    <PartyPopper className="h-4 w-4" />
                    <span>Available!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col">
            {/* Roles/Titles */}
            {portfolioData.title && (
              <div className="mb-6 flex flex-wrap gap-3">
                {portfolioData.title.split(',').map((role, idx) => (
                  <span
                    key={idx}
                    className={`inline-block rounded-full ${
                      idx % 2 === 0 ? 'bg-yellow-400' : 'bg-teal-400'
                    } px-4 py-2 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:scale-110 ${
                      idx % 2 === 0 ? 'hover:bg-yellow-500' : 'hover:bg-teal-500'
                    } hover:shadow-xl ${
                      mounted ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {role.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Bio */}
            <p className="mb-8 text-lg leading-relaxed text-black dark:text-white md:text-xl">
              {portfolioData.description}
            </p>

            {/* Skills Tags */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-black dark:text-white">
                <Sparkles className="h-5 w-5" />
                What I Do
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => {
                  const IconComponent = skill.icon
                  const isTeal = skill.color === 'bg-teal-400'
                  return (
                    <div
                      key={idx}
                      className={`group relative overflow-hidden rounded-full ${skill.color} px-4 py-2 text-sm font-semibold text-black shadow-md transition-all duration-300 hover:scale-110 ${
                        isTeal ? 'hover:bg-teal-500' : 'hover:bg-yellow-500'
                      } hover:shadow-xl ${
                        mounted ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{skill.name}</span>
                      </span>
                      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-full bg-black px-8 py-6 text-lg font-bold text-yellow-400 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-yellow-400 hover:text-black hover:shadow-2xl"
              >
                <a href={`mailto:${portfolioData.email || 'visalprak2015@email.com'}`}>
                  <span className="relative z-10 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Hire Me</span>
                  </span>
                </a>
              </Button>
              <Button
                size="lg"
                onClick={onDownloadCV}
                className="group rounded-full border-2 border-black bg-white px-8 py-6 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-teal-400 hover:border-teal-400 hover:text-black hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Download CV</span>
                </span>
              </Button>
            </div>
            </div>
          </div>

          {/* Education Experience Section - Expanded */}
          <div className="order-1 lg:order-2">
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-black dark:text-white" />
              <h3 className="text-3xl font-black text-black dark:text-white md:text-4xl">
                Education Experience
              </h3>
            </div>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-yellow-200 to-yellow-400" />

              {/* Education entries */}
              <div className="space-y-12">
                {educationData.map((education, idx) => (
                  <div key={idx} className="relative pl-16">
                    {/* Timeline dot */}
                    <div className={`absolute left-4 top-3 h-5 w-5 rounded-full border-3 border-black bg-yellow-400 shadow-lg`} />
                    
                    {/* Date */}
                    <div className="mb-4">
                      <div className={`inline-block rounded-full px-4 py-2 text-sm font-bold text-black shadow-md bg-yellow-400`}>
                        {education.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h4 className="mb-4 text-2xl font-bold text-black dark:text-white md:text-3xl">
                        {education.institution}
                      </h4>
                      
                      {education.courses.map((course, courseIdx) => (
                        <div key={courseIdx} className="mb-6 last:mb-0 rounded-2xl border-2 border-black dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 p-4 shadow-lg">
                          <h5 className="mb-3 text-lg font-semibold text-black dark:text-white md:text-xl">
                            {course.name}
                          </h5>
                          <ul className="space-y-2 text-sm leading-relaxed text-black dark:text-gray-300 md:text-base">
                            {course.description.map((desc, descIdx) => (
                              <li key={descIdx} className="flex items-start">
                                <span className={`mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-700`} />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}

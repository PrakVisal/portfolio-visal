"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

interface ContactForm {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

interface ContactSectionProps {
  portfolioData: {
    name: string
    location: string
    socialLinks: {
      instagram: string
      facebook: string
      twitter: string
      youtube: string
    }
  }
  contactForm: ContactForm
  isSubmitting: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function ContactSection({
  portfolioData,
  contactForm,
  isSubmitting,
  onInputChange,
  onSubmit,
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-2">If You have any Query or Project ideas feel free to</p>
          <h2 className="text-3xl font-bold text-gray-900">Contact me</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <div className="flex items-center mb-6">
              <div className="text-4xl font-bold text-yellow-500 mr-4">A</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{portfolioData.name}</h3>
                <p className="text-gray-600">
                  I Make as soon as Possible. You really like my work contact me and let's Work Together.
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <Link href={portfolioData.socialLinks.instagram} aria-label="Instagram" className="group">
                <Instagram className="h-6 w-6 text-gray-700 group-hover:text-pink-500 transition-colors duration-300" />
              </Link>
              <Link href={portfolioData.socialLinks.facebook} aria-label="Facebook" className="group">
                <Facebook className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
              </Link>
              <Link href={portfolioData.socialLinks.twitter} aria-label="Twitter" className="group">
                <Twitter className="h-6 w-6 text-gray-700 group-hover:text-teal-500 transition-colors duration-300" />
              </Link>
              <Link href={portfolioData.socialLinks.youtube} aria-label="YouTube" className="group">
                <Youtube className="h-6 w-6 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
              </Link>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                <span className="text-black font-bold">📍</span>
              </div>
              <p className="text-gray-700">{portfolioData.location}</p>
            </div>
          </div>

          <div>
            <Card className="shadow-xl border-none">
              <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      value={contactForm.firstName}
                      onChange={onInputChange}
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      value={contactForm.lastName}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    value={contactForm.email}
                    onChange={onInputChange}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    value={contactForm.subject}
                    onChange={onInputChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    value={contactForm.message}
                    onChange={onInputChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Contact me"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

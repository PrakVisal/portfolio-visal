'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { error } from 'console'
import { useState } from 'react'
import { contactFormSchema } from '@/lib/validations'
import { useToast } from '@/hooks/use-toast'

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
 const [errors, setErrors] = useState<Partial<ContactForm>>({})
 const { toast } = useToast()


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   const result = contactFormSchema.safeParse(contactForm)

   if (!result.success) {
     const fieldErrors: Partial<ContactForm> = {}
     result.error.errors.forEach(err => {
       const field = err.path[0] as keyof ContactForm
       fieldErrors[field] = err.message
     })
     setErrors(fieldErrors)
     return
   }

   setErrors({})
  try {
    await onSubmit(e) // await here!
    toast({
      title: 'Success',
      description: 'Message has been sent!',
    })
  } catch (err) {
    console.error(err)
    toast({
      title: 'Error',
      description: 'Failed to send message',
      variant: 'destructive',
    })
  }
 }

  return (
    <section id="contact" className="bg-white px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <p className="mb-2 text-gray-600">If You have any Query or Project ideas feel free to</p>
          <h2 className="text-3xl font-bold text-gray-900">Contact me</h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center">
              {/* <div className="text-4xl font-bold text-yellow-500 mr-4">Visal</div> */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{portfolioData.name}</h3>
                <p className="text-gray-600">
                  I Make as soon as Possible. You really like my work contact me and get some Work
                  Together.
                </p>
              </div>
            </div>

            <div className="mb-6 flex space-x-4">
              <a
                href={portfolioData.socialLinks.instagram}
                aria-label="Instagram"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-pink-500" />
              </a>
              <a
                href={portfolioData.socialLinks.facebook}
                aria-label="Facebook"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-blue-600" />
              </a>
              <a
                href={portfolioData.socialLinks.twitter}
                aria-label="Twitter"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-teal-500" />
              </a>
              <a
                href={portfolioData.socialLinks.youtube}
                aria-label="YouTube"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-red-600" />
              </a>
            </div>

            <div className="flex items-center">
              <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
                <span className="font-bold text-black">📍</span>
              </div>
              <p className="text-gray-700">{portfolioData.location}</p>
            </div>
          </div>

          <div>
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      value={contactForm.firstName}
                      onChange={onInputChange}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}

                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      value={contactForm.lastName}
                      onChange={onInputChange}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    value={contactForm.email}
                    onChange={onInputChange}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

                  <Input
                    name="subject"
                    placeholder="Subject"
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    value={contactForm.subject}
                    onChange={onInputChange}
                  />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}

                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                    value={contactForm.message}
                    onChange={onInputChange}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 text-black shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-black"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Contact me'
                    )}
                  </Button>
                  {/* {success && <p className="text-sm text-green-500">Message has been sent</p>} */}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

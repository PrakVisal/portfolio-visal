'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Send, Hand, Rocket, Sparkles, Target, MessageCircle } from 'lucide-react'

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
  errors: Partial<ContactForm>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

const FormInput = React.memo(function FormInput({
  name,
  value,
  placeholder,
  error,
  onChange,
  className = "",
}: {
  name: string
  value: string
  placeholder: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  className?: string
}) {
  return (
    <div className="flex flex-col">
      <Input 
        name={name} 
        value={value} 
        placeholder={placeholder} 
        onChange={onChange}
        className={`bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 hover:border-yellow-300 ${className}`}
      />
      {error && <p className="text-sm text-red-500 mt-1 ml-1 animate-pulse">{error}</p>}
    </div>
  )
})


export default function ContactSection({
  portfolioData,
  contactForm,
  isSubmitting,
  onInputChange,
  errors,
  onSubmit,
}: ContactSectionProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-white px-4 py-20 md:py-28">
      {/* Animated background elements - Reduced blur for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center mb-4 w-20 h-20 rounded-full bg-yellow-400 shadow-lg">
            <Hand className="h-10 w-10 text-black" />
          </div>
          <p className="mb-3 text-lg md:text-xl text-gray-600 font-medium">
            Got a project in mind? Let's make it happen!
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-black mb-2">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-teal-400 mx-auto rounded-full"></div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Side - Info Card */}
          <div className="order-2 lg:order-1">
            <div className="h-full backdrop-blur-xl bg-white rounded-3xl border-2 border-gray-200 shadow-2xl p-8 md:p-10 hover:shadow-3xl hover:border-yellow-400 transition-all duration-500">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-black text-black mb-3">
                  {portfolioData.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  I'm always down to collaborate on cool projects!{' '}
                  <Rocket className="inline h-5 w-5 text-yellow-500 align-middle" />
                  <br />
                  Hit me up and let's build something amazing together.
                </p>
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Connect With Me</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={portfolioData.socialLinks.instagram}
                    aria-label="Instagram"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-black shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-6 w-6 text-white group-hover:rotate-12 transition-all duration-300" />
                  </a>
                  <a
                    href={portfolioData.socialLinks.facebook}
                    aria-label="Facebook"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-black shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:bg-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-6 w-6 text-white group-hover:rotate-12 transition-all duration-300" />
                  </a>
                  <a
                    href={portfolioData.socialLinks.twitter}
                    aria-label="Twitter"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-black shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:bg-teal-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-6 w-6 text-white group-hover:text-black group-hover:rotate-12 transition-all duration-300" />
                  </a>
                  <a
                    href={portfolioData.socialLinks.youtube}
                    aria-label="YouTube"
                    className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-black shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:bg-red-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="h-6 w-6 text-white group-hover:rotate-12 transition-all duration-300" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400 shadow-md">
                  <MapPin className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
                  <p className="text-black font-semibold">{portfolioData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="order-1 lg:order-2">
            <div className="backdrop-blur-xl bg-white rounded-3xl border-2 border-gray-200 shadow-2xl p-8 md:p-10 hover:shadow-3xl hover:border-yellow-400 transition-all duration-500">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-6 w-6 text-yellow-500" />
                  <h3 className="text-2xl font-black text-black">Send a Message</h3>
                </div>
                <p className="text-gray-500 text-sm">Fill out the form below and I'll get back to you ASAP!</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    {!errors.firstName && (
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-400 pointer-events-none" />
                    )}
                    <FormInput
                      name="firstName"
                      value={contactForm.firstName}
                      placeholder="First Name"
                      error={errors.firstName}
                      onChange={onInputChange}
                      className={errors.firstName ? "" : "pl-10"}
                    />
                  </div>
                  <div className="relative">
                    {!errors.lastName && (
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-400 pointer-events-none" />
                    )}
                    <FormInput
                      name="lastName"
                      value={contactForm.lastName}
                      placeholder="Last Name"
                      error={errors.lastName}
                      onChange={onInputChange}
                      className={errors.lastName ? "" : "pl-10"}
                    />
                  </div>
                </div>
                <div className="relative">
                  {!errors.email && (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-400 pointer-events-none" />
                  )}
                  <FormInput
                    name="email"
                    value={contactForm.email}
                    placeholder="Your Email"
                    error={errors.email}
                    onChange={onInputChange}
                    className={errors.email ? "" : "pl-10"}
                  />
                </div>
                <div className="relative">
                  {!errors.subject && (
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-400 pointer-events-none" />
                  )}
                  <FormInput
                    name="subject"
                    value={contactForm.subject}
                    placeholder="Subject"
                    error={errors.subject}
                    onChange={onInputChange}
                    className={errors.subject ? "" : "pl-10"}
                  />
                </div>

                <div className="flex flex-col relative">
                  {!errors.message && (
                    <Rocket className="absolute left-3 top-4 h-4 w-4 text-yellow-400 pointer-events-none" />
                  )}
                  <Textarea
                    name="message"
                    placeholder="Your Message... Let's talk!"
                    rows={6}
                    className={`bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl ${errors.message ? "px-4" : "pl-10"} pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 hover:border-yellow-300 resize-none`}
                    value={contactForm.message}
                    onChange={onInputChange}
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-1 ml-1 animate-pulse">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full group relative overflow-hidden bg-black text-yellow-400 font-bold py-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-yellow-400 border-t-transparent group-hover:border-black"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

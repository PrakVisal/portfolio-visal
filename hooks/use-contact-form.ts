'use client'

import React, { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { contactFormSchema } from '@/lib/validations'

interface ContactForm {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export function useContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})
  const [contactForm, setContactForm] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setContactForm(prev => ({
        ...prev,
        [name]: value,
      }))
      // Clear error for the field as user types
      setErrors(prev => ({ ...prev, [name]: undefined }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (isSubmitting) return // prevent double submit
      setIsSubmitting(true)
      setErrors({}) // reset previous errors

      try {
        // Validate form with Zod
        const parsed = contactFormSchema.safeParse(contactForm)
        if (!parsed.success) {
          const fieldErrors: Partial<Record<keyof ContactForm, string>> = {}
          parsed.error.errors.forEach(err => {
            const key = err.path[0] as keyof ContactForm
            fieldErrors[key] = err.message
          })
          setErrors(fieldErrors)
          return
        }

        // Submit to API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactForm),
        })
        const result = await response.json()

        if (result.success) {
          toast({ title: 'Message Sent!', description: result.message })
          setContactForm({ firstName: '', lastName: '', email: '', subject: '', message: '' })
        } else {
          toast({ title: 'Error', description: result.message || 'Failed to send message', variant: 'destructive' })
        }
      } catch (err) {
        toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' })
      } finally {
        setIsSubmitting(false)
      }
    },
    [contactForm, isSubmitting, toast]
  )

  return {
    contactForm,
    isSubmitting,
    errors,
    handleInputChange,
    handleSubmit,
  }
}

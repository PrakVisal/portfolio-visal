import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please provide a valid email address')
    .max(100, 'Email must not exceed 100 characters'),

  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(100, 'Subject must not exceed 100 characters'),

  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message must not exceed 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const portfolioUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  title: z.string().min(1, 'Title is required').max(200),
  profile_image: z.string().max(200).optional().or(z.literal('')),
  about_image: z.string().max(200).optional().or(z.literal('')),
  description: z.string().min(1, 'Description is required').max(1000),
  location: z.string().min(1, 'Location is required').max(100),
  socialLinks: z.object({
    instagram: z.string().url().optional().or(z.literal('')),
    facebook: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal('')),
  }),
})

export type PortfolioUpdateData = z.infer<typeof portfolioUpdateSchema>

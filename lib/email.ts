import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number.parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      ...options,
    })
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    throw new Error('Failed to send email')
  }
}

export function generateContactEmailTemplate(data: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}) {
  return {
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FFD429; border-bottom: 2px solid #4ECDC4; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4ECDC4; margin-top: 10px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${data.firstName} ${data.lastName}
      Email: ${data.email}
      Subject: ${data.subject}
      
      Message:
      ${data.message}
    `,
  }
}

export function generateAutoReplyTemplate(firstName: string) {
  return {
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FFD429; border-bottom: 2px solid #4ECDC4; padding-bottom: 10px;">
          Thank you for contacting me!
        </h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Hi ${firstName},</p>
          <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
          <p>I typically respond within 24-48 hours during business days.</p>
          <p>Best regards,<br><strong>Muhammad Aqsam</strong><br>UI/UX Designer & Flutter Developer</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 12px;">
            Follow me on social media for updates and latest work!
          </p>
        </div>
      </div>
    `,
    text: `
      Hi ${firstName},
      
      Thank you for reaching out! I've received your message and will get back to you as soon as possible.
      
      I typically respond within 24-48 hours during business days.
      
      Best regards,
      Muhammad Aqsam
      UI/UX Designer & Flutter Developer
    `,
  }
}

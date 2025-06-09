import emailjs from '@emailjs/browser'

// You should store these in environment variables in production
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

export async function sendFeedbackResponseEmail({
  toEmail,
  toName,
  message,
  feedbackType,
  feedbackText,
}: {
  toEmail: string
  toName?: string
  message: string
  feedbackType?: string
  feedbackText?: string
}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    const missingVars = []
    if (!SERVICE_ID) missingVars.push('VITE_EMAILJS_SERVICE_ID')
    if (!TEMPLATE_ID) missingVars.push('VITE_EMAILJS_TEMPLATE_ID')
    if (!PUBLIC_KEY) missingVars.push('VITE_EMAILJS_PUBLIC_KEY')
    throw new Error(`EmailJS environment variables are not set: ${missingVars.join(', ')}`)
  }

  const templateParams = {
    to_email: toEmail,
    to_name: toName || toEmail,
    message,
    feedback_type: feedbackType,
    feedback_text: feedbackText,
  }

  try {
    return await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

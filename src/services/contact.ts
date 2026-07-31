import { CONTACT_CONFIG, SITE } from '@/constants/site'

export interface ContactFormValues {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  botcheck?: string
}

export interface ContactResult {
  ok: boolean
  message: string
}

/**
 * Submits the contact form to Web3Forms.
 *
 * Web3Forms is a form-to-email relay: the access key is a public submission
 * identifier rather than a secret, which is what makes a serverless-free
 * contact form possible on a static deploy.
 */
export async function submitContactForm(values: ContactFormValues): Promise<ContactResult> {
  // Silently succeed for bots — telling them they were caught only helps them.
  if (values.botcheck) {
    return { ok: true, message: 'Message sent.' }
  }

  if (!CONTACT_CONFIG.web3formsKey) {
    return {
      ok: false,
      message: 'The contact form is not configured. Set VITE_WEB3FORMS_ACCESS_KEY in your .env.',
    }
  }

  const payload = {
    access_key: CONTACT_CONFIG.web3formsKey,
    subject: `Portfolio enquiry — ${values.subject}`,
    from_name: `${values.name} (portfolio)`,
    name: values.name,
    email: values.email,
    phone: values.phone || 'Not provided',
    message: values.message,
    // Shown in the notification email so you know which deployment it came from.
    site: SITE.url,
    botcheck: '',
  }

  try {
    const response = await fetch(CONTACT_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = (await response.json()) as { success?: boolean; message?: string }

    if (!response.ok || !data.success) {
      return { ok: false, message: data.message ?? 'The message could not be delivered.' }
    }

    return { ok: true, message: data.message ?? 'Message sent.' }
  } catch {
    return {
      ok: false,
      message: 'Network error — check your connection, or email me directly.',
    }
  }
}

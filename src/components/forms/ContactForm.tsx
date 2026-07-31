import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CONTACT_CONFIG } from '@/constants/site'
import { cn } from '@/lib/cn'
import { type ContactFormValues, submitContactForm } from '@/services/contact'
import { EMAIL_PATTERN, FIELD_LIMITS, PHONE_PATTERN, VALIDATION_MESSAGES } from '@/utils/validation'

import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { useToast } from '../ui/toast'

type Status = 'idle' | 'success' | 'error'

const inputClass = (hasError: boolean): string =>
  cn(
    'w-full rounded-xl border bg-background-alt/60 px-4 py-3 text-sm text-content-primary',
    'placeholder:text-content-muted transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    hasError
      ? 'border-danger/60 focus:border-danger focus:ring-danger/25'
      : 'border-border focus:border-accent focus:ring-accent/25'
  )

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const { push } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '', botcheck: '' },
  })

  const messageLength = watch('message')?.length ?? 0

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle')
    const result = await submitContactForm(values)

    if (result.ok) {
      setStatus('success')
      reset()
      push({
        tone: 'success',
        title: 'Message sent',
        description: 'Thanks for reaching out — I usually reply within a day.',
      })
    } else {
      setStatus('error')
      push({ tone: 'error', title: 'Could not send message', description: result.message })
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/*
        Honeypot. Hidden from sighted users with CSS and from screen readers
        with aria-hidden + tabIndex, so only an automated form-filler ever
        populates it. `submitContactForm` short-circuits when it is non-empty.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor={CONTACT_CONFIG.honeypotField}>Leave this field empty</label>
        <input
          id={CONTACT_CONFIG.honeypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="h-0 w-0 border-0 p-0 opacity-0"
          {...register('botcheck')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-content-primary"
          >
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClass(Boolean(errors.name))}
            {...register('name', {
              required: VALIDATION_MESSAGES.nameRequired,
              minLength: { value: FIELD_LIMITS.nameMin, message: VALIDATION_MESSAGES.nameTooShort },
              maxLength: { value: FIELD_LIMITS.nameMax, message: 'That name is unusually long.' },
            })}
          />
          <FieldError id="contact-name-error" message={errors.name?.message} />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-content-primary"
          >
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClass(Boolean(errors.email))}
            {...register('email', {
              required: VALIDATION_MESSAGES.emailRequired,
              pattern: { value: EMAIL_PATTERN, message: VALIDATION_MESSAGES.emailInvalid },
            })}
          />
          <FieldError id="contact-email-error" message={errors.email?.message} />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-medium text-content-primary"
          >
            Phone <span className="font-normal text-content-muted">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            className={inputClass(Boolean(errors.phone))}
            {...register('phone', {
              pattern: { value: PHONE_PATTERN, message: VALIDATION_MESSAGES.phoneInvalid },
            })}
          />
          <FieldError id="contact-phone-error" message={errors.phone?.message} />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-2 block text-sm font-medium text-content-primary"
          >
            Subject <span className="text-danger">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Backend role, freelance project, collaboration…"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            className={inputClass(Boolean(errors.subject))}
            {...register('subject', {
              required: VALIDATION_MESSAGES.subjectRequired,
              minLength: { value: FIELD_LIMITS.subjectMin, message: 'A little more, please.' },
              maxLength: { value: FIELD_LIMITS.subjectMax, message: 'Please shorten the subject.' },
            })}
          />
          <FieldError id="contact-subject-error" message={errors.subject?.message} />
        </div>
      </div>

      {/* Message */}
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-content-primary"
          >
            Message <span className="text-danger">*</span>
          </label>
          <span
            className={cn(
              'text-[0.7rem] tabular-nums',
              messageLength > FIELD_LIMITS.messageMax ? 'text-danger' : 'text-content-muted'
            )}
          >
            {messageLength}/{FIELD_LIMITS.messageMax}
          </span>
        </div>
        <textarea
          id="contact-message"
          rows={6}
          placeholder="Tell me what you are building, the stack, and what you need from me."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputClass(Boolean(errors.message)), 'resize-y')}
          {...register('message', {
            required: VALIDATION_MESSAGES.messageRequired,
            minLength: {
              value: FIELD_LIMITS.messageMin,
              message: VALIDATION_MESSAGES.messageTooShort,
            },
            maxLength: {
              value: FIELD_LIMITS.messageMax,
              message: VALIDATION_MESSAGES.messageTooLong,
            },
          })}
        />
        <FieldError id="contact-message-error" message={errors.message?.message} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" size="lg" iconRight="send" loading={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>

        <p className="text-xs text-content-muted">
          Protected by a honeypot field. No tracking, no newsletter.
        </p>
      </div>

      {/* Inline status, mirrored in a toast. */}
      <div aria-live="polite" className="min-h-[1.5rem]">
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-secondary"
          >
            <Icon name="check-circle" className="h-4 w-4" />
            Message sent. I usually reply within a day.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-danger"
          >
            <Icon name="alert-circle" className="h-4 w-4" />
            Something went wrong. Email me directly and I will pick it up.
          </motion.p>
        )}
      </div>
    </form>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-danger">
      <Icon name="alert-circle" className="h-3 w-3 shrink-0" />
      {message}
    </p>
  )
}

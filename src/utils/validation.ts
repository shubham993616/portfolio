/** Shared validation rules for the contact form. */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Accepts international formats with spaces, dashes, parentheses and +. */
export const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/

export const VALIDATION_MESSAGES = {
  nameRequired: 'Please tell me your name.',
  nameTooShort: 'That looks a little short — at least 2 characters.',
  emailRequired: 'An email address is required so I can reply.',
  emailInvalid: 'That email address does not look right.',
  phoneInvalid: 'Use digits, spaces, dashes or a leading +.',
  subjectRequired: 'Add a subject so I know what this is about.',
  messageRequired: 'The message field is empty.',
  messageTooShort: 'A little more detail would help — at least 20 characters.',
  messageTooLong: 'Please keep it under 2000 characters.',
} as const

export const FIELD_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  subjectMin: 3,
  subjectMax: 120,
  messageMin: 20,
  messageMax: 2000,
} as const

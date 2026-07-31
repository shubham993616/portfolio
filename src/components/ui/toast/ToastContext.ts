import { createContext } from 'react'

export type ToastTone = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  tone: ToastTone
  title: string
  description?: string
  durationMs: number
}

export interface ToastContextValue {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id' | 'durationMs'> & { durationMs?: number }) => string
  dismiss: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

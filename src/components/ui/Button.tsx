import { type ButtonHTMLAttributes, type ReactNode, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'

import { Icon } from './Icon'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const BASE =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-medium ' +
  'transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'whitespace-nowrap select-none'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-[0_8px_28px_-10px_rgb(var(--color-accent)/0.9)] ' +
    'hover:bg-accent-strong hover:shadow-[0_14px_36px_-10px_rgb(var(--color-accent)/1)] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-secondary/12 text-secondary border border-secondary/35 ' +
    'hover:bg-secondary/20 hover:border-secondary/60 hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-border-strong bg-surface/40 text-content-primary backdrop-blur ' +
    'hover:border-accent/60 hover:bg-surface hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-content-secondary hover:bg-surface hover:text-content-primary',
  subtle:
    'bg-surface text-content-secondary border border-border hover:border-border-strong hover:text-content-primary',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
  icon: 'h-10 w-10 p-0',
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: IconName
  iconRight?: IconName
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

const buildClassName = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: CommonProps): string =>
  cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)

const Inner = ({ iconLeft, iconRight, children }: CommonProps) => (
  <>
    {iconLeft && <Icon name={iconLeft} className="h-4 w-4 shrink-0" />}
    {children}
    {iconRight && (
      <Icon
        name={iconRight}
        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5"
      />
    )}
  </>
)

/* -------------------------------------------------------------------------- */
/*  Ripple                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Click ripple, appended as a bare DOM node rather than React state so that
 * rapid clicks never queue re-renders.
 */
function useRipple() {
  const ref = useRef<HTMLElement | null>(null)

  const spawn = useCallback((event: { clientX: number; clientY: number }) => {
    const host = ref.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = host.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const ripple = document.createElement('span')

    ripple.style.cssText = [
      'position:absolute',
      'border-radius:9999px',
      'pointer-events:none',
      'background:currentColor',
      'opacity:0.24',
      `width:${size}px`,
      `height:${size}px`,
      `left:${event.clientX - rect.left - size / 2}px`,
      `top:${event.clientY - rect.top - size / 2}px`,
      'transform:scale(0)',
      'transition:transform 600ms cubic-bezier(0.22,1,0.36,1),opacity 600ms linear',
    ].join(';')

    host.appendChild(ripple)
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)'
      ripple.style.opacity = '0'
    })
    window.setTimeout(() => ripple.remove(), 650)
  }, [])

  return { ref, spawn }
}

/* -------------------------------------------------------------------------- */
/*  Native button                                                              */
/* -------------------------------------------------------------------------- */

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    loading?: boolean
  }

export function Button({
  variant,
  size,
  iconLeft,
  iconRight,
  fullWidth,
  className,
  children,
  loading = false,
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const { ref, spawn } = useRipple()

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={buildClassName({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={(event) => {
        spawn(event)
        onClick?.(event)
      }}
      {...rest}
    >
      {loading ? (
        <>
          <Icon name="loader" className="h-4 w-4 animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <Inner iconLeft={iconLeft} iconRight={iconRight}>
          {children}
        </Inner>
      )}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  External link styled as a button                                           */
/* -------------------------------------------------------------------------- */

interface ButtonLinkProps extends CommonProps {
  href: string
  download?: boolean | string
  ariaLabel?: string
  /** Set false for same-origin links such as the resume PDF. */
  external?: boolean
  /** Side effect to run alongside navigation — analytics, for example. */
  onClick?: () => void
}

export function ButtonLink({
  href,
  download,
  ariaLabel,
  external = true,
  onClick,
  variant,
  size,
  iconLeft,
  iconRight,
  fullWidth,
  className,
  children,
}: ButtonLinkProps) {
  const { ref, spawn } = useRipple()

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      aria-label={ariaLabel}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={(event) => {
        spawn(event)
        onClick?.()
      }}
      className={buildClassName({ variant, size, fullWidth, className })}
    >
      <Inner iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Inner>
    </a>
  )
}

/* -------------------------------------------------------------------------- */
/*  Client-side route link styled as a button                                  */
/* -------------------------------------------------------------------------- */

interface ButtonRouteProps extends CommonProps {
  to: string
  ariaLabel?: string
}

export function ButtonRoute({
  to,
  ariaLabel,
  variant,
  size,
  iconLeft,
  iconRight,
  fullWidth,
  className,
  children,
}: ButtonRouteProps) {
  const { ref, spawn } = useRipple()

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      to={to}
      aria-label={ariaLabel}
      onClick={spawn}
      className={buildClassName({ variant, size, fullWidth, className })}
    >
      <Inner iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Inner>
    </Link>
  )
}

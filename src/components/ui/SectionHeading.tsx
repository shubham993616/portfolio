import { motion } from 'framer-motion'

import { blurReveal, fadeInUp } from '@/animations/variants'
import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'

import { Icon } from './Icon'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  icon?: IconName
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <motion.div
        variants={fadeInUp}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 backdrop-blur"
      >
        {icon && <Icon name={icon} className="h-3.5 w-3.5 text-accent" />}
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>

      <motion.h2
        variants={blurReveal}
        className="text-3xl leading-[1.1] tracking-tightest sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn('max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg')}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        variants={fadeInUp}
        className={cn(
          'h-px w-24 bg-gradient-to-r from-accent via-secondary to-transparent',
          align === 'center' && 'mx-auto'
        )}
      />
    </motion.header>
  )
}

import type { SocialLink } from '@/types/content'

import { PROFILE } from './profile'

export const SOCIALS: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@shubham993616',
    href: 'https://github.com/shubham993616',
    icon: 'github',
    rgb: '148 163 184',
    showInHero: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'shubham-modanwal',
    href: 'https://www.linkedin.com/in/shubham-modanwal',
    icon: 'linkedin',
    rgb: '10 102 194',
    showInHero: true,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    handle: '@imshubh4m',
    href: 'https://leetcode.com/u/imshubh4m',
    icon: 'code',
    rgb: '255 161 22',
    showInHero: true,
  },
  {
    id: 'codechef',
    label: 'CodeChef',
    handle: '@imshubh4m',
    href: 'https://www.codechef.com/users/imshubh4m',
    icon: 'terminal',
    rgb: '158 111 60',
    showInHero: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: 'mail',
    rgb: '79 140 255',
    showInHero: false,
  },
  {
    id: 'phone',
    label: 'Phone',
    handle: PROFILE.phone,
    href: PROFILE.phoneHref,
    icon: 'phone',
    rgb: '0 212 170',
    showInHero: false,
  },
] as const

export const HERO_SOCIALS = SOCIALS.filter((social) => social.showInHero)

export const getSocial = (id: SocialLink['id']): SocialLink => {
  const match = SOCIALS.find((social) => social.id === id)
  if (!match) throw new Error(`Unknown social platform: ${id}`)
  return match
}

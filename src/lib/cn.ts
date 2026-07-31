type ClassValue =
  string | number | null | undefined | false | ClassValue[] | Record<string, boolean>

/**
 * Minimal `clsx` replacement. Conditionally joins class names without pulling
 * in a dependency — the whole utility is three lines of real work.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === 'string' || typeof input === 'number') {
      out.push(String(input))
    } else if (Array.isArray(input)) {
      const nested = cn(...input)
      if (nested) out.push(nested)
    } else {
      for (const [key, active] of Object.entries(input)) {
        if (active) out.push(key)
      }
    }
  }

  return out.join(' ')
}

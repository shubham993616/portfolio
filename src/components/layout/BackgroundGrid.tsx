/**
 * Fixed ambient backdrop: a faint dot grid, two slow-drifting colour blooms
 * and a noise layer to keep the gradients from banding.
 *
 * Everything here is `pointer-events-none` and purely decorative, so it sits
 * outside the accessibility tree entirely.
 */
export function BackgroundGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(var(--color-border-strong) / 0.6) 1px, transparent 0)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      {/* Colour blooms */}
      <div
        className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 animate-float rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgb(var(--color-accent) / 0.20), transparent 68%)',
        }}
      />
      <div
        className="absolute -right-40 top-[38%] h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--color-secondary) / 0.14), transparent 70%)',
          animation: 'float 9s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute -left-32 bottom-[8%] h-[26rem] w-[26rem] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgb(var(--color-accent) / 0.10), transparent 70%)',
        }}
      />

      {/* Grain */}
      <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}

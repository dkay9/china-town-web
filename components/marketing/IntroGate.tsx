'use client'

import { useEffect, useRef } from 'react'
import { useIntroLoader } from '@/hooks/useIntroLoader'

export function IntroGate({ children }: { children: React.ReactNode }) {
  const { showIntro, introComplete } = useIntroLoader()
  const hasRefreshed = useRef(false)

  useEffect(() => {
    if (introComplete && !hasRefreshed.current) {
      hasRefreshed.current = true

      requestAnimationFrame(() => {
        if (typeof window !== 'undefined') {
          import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh()
          })
        }
      })
    }
  }, [introComplete])

  // NOTE: This intentionally omits page content from the initial server-rendered
  // HTML until the intro completes. This trades some SEO/no-JS robustness for
  // guaranteed-correct GSAP/Lenis measurement on mount. If SEO becomes a concern,
  // revisit with a hybrid approach (e.g. render content server-side but delay
  // only the GSAP/ScrollTrigger initialization client-side instead of the DOM mount).
  if (showIntro || !introComplete) {
    return null
  }

  return <>{children}</>
}

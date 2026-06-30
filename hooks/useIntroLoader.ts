'use client'

import { useState, useEffect } from 'react'

export function useIntroLoader() {
  // Static literals — identical on server and client first render, no mismatch possible.
  const [showIntro, setShowIntro] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(false)

  useEffect(() => {
    // Runs client-only, after hydration — safe to check browser APIs here.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasPlayed = sessionStorage.getItem('intro-played')

    if (hasPlayed || prefersReduced) {
      setSkipAnimation(true)
      setShowIntro(false)
      setIntroComplete(true)
    }
  }, [])

  const handleComplete = () => {
    sessionStorage.setItem('intro-played', 'true')
    setShowIntro(false)
    setIntroComplete(true)
  }

  return { showIntro, introComplete, skipAnimation, handleComplete }
}

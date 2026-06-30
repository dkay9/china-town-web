'use client'

import { useState, useEffect } from 'react'

export function useIntroLoader() {
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasPlayed = sessionStorage.getItem('intro-played')

    if (hasPlayed || prefersReduced) {
      setIntroComplete(true)
      return
    }
    setShowIntro(true)
  }, [])

  const handleComplete = () => {
    sessionStorage.setItem('intro-played', 'true')
    setShowIntro(false)
    setIntroComplete(true)
  }

  return { showIntro, introComplete, handleComplete }
}

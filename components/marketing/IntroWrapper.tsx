'use client'

import { useIntroLoader } from '@/hooks/useIntroLoader'
import GearLoader from '@/components/marketing/GearLoader'

export function IntroWrapper() {
  const { showIntro, skipAnimation, handleComplete } = useIntroLoader()
  if (!showIntro) return null
  return <GearLoader onComplete={handleComplete} skipAnimation={skipAnimation} />
}

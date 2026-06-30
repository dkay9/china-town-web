'use client'

import { useEffect, useRef, useState } from 'react'

interface GearLoaderProps {
  onComplete: () => void
  minDisplayMs?: number
  skipAnimation?: boolean
}

function generateGearPath(
  cx: number,
  cy: number,
  teeth: number,
  outerRadius: number,
  innerRadius: number
): string {
  const points: string[] = []
  const angleStep = (Math.PI * 2) / teeth
  const toothWidth = angleStep * 0.42

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * angleStep

    const a1 = baseAngle - toothWidth / 2
    const a2 = baseAngle - toothWidth / 2 + toothWidth * 0.25
    const a3 = baseAngle + toothWidth / 2 - toothWidth * 0.25
    const a4 = baseAngle + toothWidth / 2

    const rOuter = outerRadius
    const rInner = innerRadius

    points.push(`${cx + rInner * Math.cos(a1)},${cy + rInner * Math.sin(a1)}`)
    points.push(`${cx + rOuter * Math.cos(a2)},${cy + rOuter * Math.sin(a2)}`)
    points.push(`${cx + rOuter * Math.cos(a3)},${cy + rOuter * Math.sin(a3)}`)
    points.push(`${cx + rInner * Math.cos(a4)},${cy + rInner * Math.sin(a4)}`)

    const nextBase = baseAngle + angleStep - toothWidth / 2
    points.push(`${cx + rInner * Math.cos(nextBase)},${cy + rInner * Math.sin(nextBase)}`)
  }

  return `M ${points.join(' L ')} Z`
}

export default function GearLoader({ onComplete, minDisplayMs = 1800, skipAnimation = false }: GearLoaderProps) {
  const largeGearRef = useRef<SVGGElement>(null)
  const smallGearRef = useRef<SVGGElement>(null)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!skipAnimation) return
    setIsFadingOut(true)
    const timer = setTimeout(onComplete, 200)
    return () => clearTimeout(timer)
  }, [skipAnimation, onComplete])

  useEffect(() => {
    const large = largeGearRef.current
    const small = smallGearRef.current
    if (!large || !small) return
    const largeEl = large
    const smallEl = small

    let rafId: number
    let startTime: number | null = null

    const ACCEL_DURATION = 1400
    const CRUISE_SPEED = 90
    const SMALL_GEAR_RATIO = 12 / 9

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    function frame(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime

      let largeDeg: number

      if (elapsed < ACCEL_DURATION) {
        const progress = elapsed / ACCEL_DURATION
        const easedProgress = easeOutCubic(progress)
        largeDeg = easedProgress * (CRUISE_SPEED * (ACCEL_DURATION / 1000))
      } else {
        const accelDegrees = CRUISE_SPEED * (ACCEL_DURATION / 1000)
        const cruiseElapsed = elapsed - ACCEL_DURATION
        largeDeg = accelDegrees + CRUISE_SPEED * (cruiseElapsed / 1000)
      }

      const smallDeg = -largeDeg * SMALL_GEAR_RATIO

      largeEl.style.transform = `rotate(${largeDeg}deg)`
      smallEl.style.transform = `rotate(${smallDeg}deg)`

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const minDisplay = minDisplayMs ?? 1800
    const timer = setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(onComplete, 500)
    }, minDisplay)

    return () => clearTimeout(timer)
  }, [minDisplayMs, onComplete])

  const largeGearPath = generateGearPath(110, 100, 12, 32, 27)
  const smallGearPath = generateGearPath(178, 121, 9, 24, 20)

  return (
    <div
      className={`fixed inset-0 z-9999 bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 300 200"
        className="w-55 h-auto sm:w-75"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={largeGearRef} style={{ transformOrigin: '110px 100px' }}>
          <path
            d={largeGearPath}
            fill="none"
            stroke="#8a8a8a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx={110} cy={100} r={14} fill="none" stroke="#8a8a8a" strokeWidth="3" />
        </g>
        <g ref={smallGearRef} style={{ transformOrigin: '178px 121px' }}>
          <path
            d={smallGearPath}
            fill="none"
            stroke="#8a8a8a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx={178} cy={121} r={11} fill="none" stroke="#8a8a8a" strokeWidth="3" />
        </g>
      </svg>
    </div>
  )
}

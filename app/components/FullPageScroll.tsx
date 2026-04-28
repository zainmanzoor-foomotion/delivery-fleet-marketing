'use client'
import { useEffect, useRef } from 'react'

const SECTION_IDS = ['hero', 'how-it-works', 'benefits', 'cut-costs', 'marketing', 'calculator', 'footer']

export default function FullPageScroll() {
  const currentIndex = useRef(0)
  const isScrolling = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = SECTION_IDS.indexOf(entry.target.id)
            if (idx !== -1) currentIndex.current = idx
          }
        })
      },
      { threshold: 0.5 }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    const scrollToSection = (index: number) => {
      const scrollPadding = index === 0 ? 0 : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2
      const targetY =
        index === 0
          ? 0
          : (document.getElementById(SECTION_IDS[index])?.getBoundingClientRect().top ?? 0) +
            window.scrollY - scrollPadding

      const startY = window.scrollY
      const distance = targetY - startY
      const duration = 350
      const startTime = performance.now()

      isScrolling.current = true
      currentIndex.current = index

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        window.scrollTo(0, startY + distance * easeInOut(progress))
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          isScrolling.current = false
        }
      }

      requestAnimationFrame(animate)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling.current) return
      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = currentIndex.current + direction
      if (nextIndex < 0 || nextIndex >= SECTION_IDS.length) return
      scrollToSection(nextIndex)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      observer.disconnect()
    }
  }, [])

  return null
}

"use client"

import { useEffect, type ReactNode } from "react"
import { stagger, useAnimate, useReducedMotion } from "motion/react"
import { useIntroExperience } from "@/components/intro-experience"

export default function HeroSequence({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reducedMotion = useReducedMotion()
  const { ready } = useIntroExperience()

  useEffect(() => {
    if (reducedMotion || !ready) return
    const animation = animate([
      [".hero-label", { opacity: [0, 1], y: [12, 0] }, { duration: 0.5, at: 0 }],
      [".hero-line", { opacity: [0, 1], y: [35, 0], filter: ["blur(4px)", "blur(0px)"] }, { duration: 0.75, delay: stagger(0.1), at: 0.1 }],
      [".hero-intro", { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, at: 0.35 }],
      [".hero-actions", { opacity: [0, 1], y: [12, 0] }, { duration: 0.5, at: 0.5 }],
      [".hero-location", { opacity: [0, 1] }, { duration: 0.5, at: 0.6 }],
      [".hero-world", { opacity: [0, 1], y: [45, 0] }, { duration: 1.1, at: 0.55 }],
    ], { defaultTransition: { ease: [0.22, 1, 0.36, 1] } })
    return () => animation.stop()
  }, [animate, ready, reducedMotion])

  return <div ref={scope} className="hero-sequence">{children}</div>
}

"use client"

import { useEffect, type ReactNode } from "react"
import { useAnimate, useInView, useReducedMotion } from "motion/react"

export default function Reveal({ children, className, delay = 0 }: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, { once: true, margin: "0px 0px -40px 0px" })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || reducedMotion) return
    // Content remains visible in server HTML and when JavaScript is unavailable.
    const animation = animate(scope.current, { opacity: [0.4, 1], y: [24, 0], filter: ["blur(4px)", "blur(0px)"] }, {
      duration: 0.75, delay, ease: [0.22, 1, 0.36, 1],
    })
    return () => animation.stop()
  }, [animate, delay, inView, reducedMotion, scope])

  return <div ref={scope} className={className}>{children}</div>
}

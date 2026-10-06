"use client"

import Image from "next/image"
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, stagger, useAnimate, useReducedMotion } from "motion/react"
import { ArrowRight, RotateCcw } from "lucide-react"

const IntroContext = createContext<{ ready: boolean; replay: () => void } | null>(null)

const introPhotos = [
  { id: "beach", src: "/intro/kt-beach.jpg", caption: "Out in the world." },
  { id: "heart", src: "/intro/kt-heart.jpg", caption: "Curious by nature." },
  { id: "thumbs", src: "/intro/kt-thumbs-up.jpg", caption: "Enjoying the process." },
]

export function useIntroExperience() {
  const context = useContext(IntroContext)
  if (!context) throw new Error("Intro controls require IntroExperience")
  return context
}

export function ReplayIntro() {
  const { replay } = useIntroExperience()
  return <button type="button" className="replay-intro" onClick={replay}>Replay intro <RotateCcw size={12} /></button>
}

function Greeting({ onComplete }: { onComplete: () => void }) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const skipRef = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) { onComplete(); return }
    let cancelled = false
    const animation = animate([
      [".intro-hello > span", { opacity: [0, 1], y: [32, 0], filter: ["blur(5px)", "blur(0px)"] }, { duration: 0.55, delay: stagger(0.12), at: 0.1 }],
      [".intro-hello", { opacity: [1, 0], y: [0, -35] }, { duration: 0.35, at: 1.3 }],
      [".intro-card", { opacity: [0, 1], y: [130, 0], scale: [0.85, 1] }, { duration: 0.55, delay: stagger(0.65), at: 1.4 }],
      [".intro-beach", { x: [0, -75], scale: [1, 0.94] }, { duration: 0.6, at: 2.05 }],
      [".intro-heart", { x: [0, 60], scale: [1, 0.96] }, { duration: 0.6, at: 2.7 }],
      [".intro-caption", { opacity: [0, 1], y: [15, 0] }, { duration: 0.45, at: 1.9 }],
      [".intro-stack", { opacity: [1, 0], y: [0, -65] }, { duration: 0.4, at: 4 }],
      [".intro-tools > span", { opacity: [0, 1], y: [30, 0] }, { duration: 0.55, delay: stagger(0.1), at: 4.25 }],
      [".intro-tools", { opacity: [1, 0], y: [0, -30] }, { duration: 0.35, at: 6.5 }],
      [".intro-portfolio > span", { opacity: [0, 1], y: [30, 0] }, { duration: 0.55, delay: stagger(0.1), at: 6.9 }],
      [".intro-portfolio", { opacity: [1, 0], y: [0, -30] }, { duration: 0.35, at: 9.55 }],
      [".intro-welcome > span", { opacity: [0, 1], y: [30, 0] }, { duration: 0.55, delay: stagger(0.1), at: 9.95 }],
      [".intro-progress-fill", { scaleX: [0, 1] }, { duration: 11.2, ease: "linear", at: 0 }],
    ], { defaultTransition: { ease: [0.22, 1, 0.36, 1] } })
    animation.then(() => { if (!cancelled) onComplete() })
    return () => { cancelled = true; animation.stop() }
  }, [animate, onComplete, reducedMotion])

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    skipRef.current?.focus({ preventScroll: true })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onComplete()
      if (event.key === "Tab") { event.preventDefault(); skipRef.current?.focus() }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus({ preventScroll: true })
    }
  }, [onComplete])

  return (
    <motion.div ref={scope} className="intro-screen" role="dialog" aria-modal="true" aria-label="Welcome. I’m Khuluza Tshabalala."
      initial={false} exit={{ y: "-100%" }} transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}>
      <span className="intro-wordmark" aria-hidden="true">kt<span>.</span></span>
      <div className="intro-stage" aria-hidden="true">
        <p className="intro-hello"><span>Hi,</span> <span>I’m</span><br /><span>Khuluza<span className="intro-period">.</span></span></p>
        <div className="intro-stack">
          {introPhotos.map((photo) => <figure key={photo.id} className={`intro-card intro-photo intro-${photo.id}`}><Image src={photo.src} fill alt="" priority sizes="(max-width: 600px) 200px, 264px" /><figcaption>{photo.caption}</figcaption></figure>)}
          <p className="intro-caption">I build. I learn. I keep exploring.</p>
        </div>
        <p className="intro-message intro-tools"><span>I love working with</span><span>and building <em>AI tools.</em></span></p>
        <p className="intro-message intro-portfolio"><span>It’s really fun and</span><span>this is my portfolio.</span></p>
        <p className="intro-welcome"><span>Welcome to</span><br /><span>my world<span className="intro-period">.</span></span></p>
      </div>
      <div className="intro-bottom"><span className="intro-origin">South Africa · A work in progress</span><div className="intro-progress" aria-hidden="true"><span className="intro-progress-fill" /></div><button ref={skipRef} type="button" onClick={onComplete}>Skip intro <ArrowRight size={14} /></button></div>
    </motion.div>
  )
}

export default function IntroExperience({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(true)
  const finish = useCallback(() => setActive(false), [])
  const replay = useCallback(() => { window.scrollTo({ top: 0, behavior: "instant" }); setActive(true) }, [])

  return <IntroContext.Provider value={{ ready: !active, replay }}>
    {children}
    <AnimatePresence>{active && <Greeting key="greeting" onComplete={finish} />}</AnimatePresence>
    <noscript><style>{".intro-screen { display: none !important; }"}</style></noscript>
  </IntroContext.Provider>
}

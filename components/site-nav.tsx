"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useIntroExperience } from "@/components/intro-experience"

const links = [
  { id: "work", label: "The work" },
  { id: "about", label: "The person" },
  { id: "journal", label: "The journey" },
]

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState("")
  const { ready } = useIntroExperience()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id)
      }
    }, { rootMargin: "-15% 0px -55% 0px" })
    for (const { id } of links) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        document.getElementById("menu-toggle")?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  return (
    <header className={`site-header ${ready ? "nav-enter" : "nav-wait"}`}>
      <a href="#home" className="wordmark" aria-label="Khuluza Tshabalala, home">kt<span>.</span></a>
      <a href="#contact" className="mobile-contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={14} /></a>
      <button id="menu-toggle" type="button" className="menu-toggle" aria-expanded={menuOpen}
        aria-controls="main-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      <nav id="main-navigation" className={`main-navigation ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
        {links.map(({ id, label }) => (
          <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}
            onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  )
}

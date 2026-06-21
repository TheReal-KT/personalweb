"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Radar,
  Sparkles,
  Workflow,
} from "lucide-react"
import CircleCursor from "@/components/circle-cursor"

const sections = [
  { id: "home", label: "Start" },
  { id: "language", label: "Language" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

const focusAreas = ["Agent workflows", "Product systems", "UI direction", "Fast iteration"]

const designPrinciples = [
  {
    title: "Readable pressure",
    description: "Strong hierarchy, deliberate spacing, and clear blocks make the work legible even when the content is dense.",
    icon: Sparkles,
  },
  {
    title: "Signal over noise",
    description: "Color is reserved for status, emphasis, and action. Decorative moves stay subtle and support the narrative.",
    icon: Radar,
  },
  {
    title: "Product-first storytelling",
    description: "Every section explains what is being built, why it matters, and what kind of systems thinking sits behind it.",
    icon: Workflow,
  },
]

const projects = [
  {
    name: "Friday Agent",
    category: "Personal AI operator",
    status: "Active build",
    description:
      "A focused agent for turning loose commitments, notes, and priorities into a clear execution plan for the week.",
    emphasis: "Built to reduce context switching and make planning feel operational instead of aspirational.",
    tech: ["Next.js", "TypeScript", "AI workflows"],
    accent: "signal",
    icon: Bot,
  },
  {
    name: "DRAFT Agentic Dashboard",
    category: "Control surface",
    status: "Design + implementation",
    description:
      "An agentic dashboard for watching prompts, state, and workflow outcomes in one place instead of treating automation like a black box.",
    emphasis: "The goal is a usable operator view for agent systems, not another demo-only interface.",
    tech: ["Dashboard UX", "State design", "Agent orchestration"],
    accent: "accent",
    icon: Blocks,
  },
  {
    name: "BLVNK",
    category: "Product work",
    status: "Ongoing",
    description:
      "Minimal by design here: focused product execution across flows, integrations, and internal delivery surfaces.",
    emphasis: "This stays concise on the site while still showing the product lane I am actively shipping in.",
    tech: ["Product delivery", "Integrations", "Operations"],
    accent: "foreground",
    icon: BriefcaseBusiness,
  },
  {
    name: "Discovery GradHack Hackathon",
    category: "Live sprint",
    status: "Current event",
    description:
      "A fast-moving build environment where I can pressure-test product instincts, prototype quickly, and collaborate under a hard deadline.",
    emphasis: "Hackathon work sharpens speed, clarity, and the ability to turn rough ideas into something demoable.",
    tech: ["Rapid prototyping", "Team build", "Presentation"],
    accent: "signal",
    icon: Sparkles,
  },
]

const operatingModes = [
  "Define the product edge before touching polish.",
  "Build interfaces that expose system state clearly.",
  "Keep momentum visible with tangible deliverables instead of vague progress.",
]

const links = [
  {
    label: "Email",
    value: "khuluza0@gmail.com",
    href: "mailto:khuluza0@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "TheReal-KT",
    href: "https://github.com/TheReal-KT",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Khuluza Tshabalala",
    href: "https://www.linkedin.com/in/khuluza-tshabalala-933161288/",
    icon: Linkedin,
  },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -15% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CircleCursor />

      <div className="pointer-events-none fixed inset-0">
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-signal/12 blur-3xl" />
        <div className="absolute right-[-6rem] top-[38rem] h-80 w-80 rounded-full bg-accent/12 blur-3xl" />
      </div>

      <nav className="fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
        <div className="panel flex flex-col gap-2 p-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`nav-pill ${activeSection === section.id ? "nav-pill-active" : ""}`}
              aria-current={activeSection === section.id ? "true" : undefined}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-12 pt-5 sm:px-8 lg:px-12">
        <header
          id="home"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="section-hidden min-h-screen scroll-mt-24 pt-20"
        >
          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
            <div className="panel flex min-h-[38rem] flex-col justify-between gap-12 p-8 sm:p-10 lg:p-12">
              <div className="space-y-6">
                <div className="eyebrow">Personal Web / 2026 refresh</div>
                <div className="space-y-5">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">Khuluza Tshabalala</p>
                  <h1 className="max-w-4xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                    Building agentic products that stay clear under pressure.
                  </h1>
                </div>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  I design and ship full-stack experiences around AI workflows, product systems, and fast-moving delivery.
                  Right now the work is anchored in Friday, DRAFT, a minimal BLVNK lane, and the Discovery GradHack
                  Hackathon sprint.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="#projects" className="primary-link">
                    See current projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="#contact" className="secondary-link">
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="chip">
                    <MapPin className="h-3.5 w-3.5" />
                    South Africa
                  </div>
                  <div className="chip">
                    <span className="signal-dot" />
                    Available for product and engineering collaboration
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="panel overflow-hidden p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border/70 bg-muted">
                  <Image src="/KT_suit.jpg" alt="Khuluza Tshabalala" fill className="object-cover" priority sizes="(min-width: 1024px) 28rem, 100vw" />
                </div>
              </div>

              <div className="panel p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="eyebrow">Current focus</div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">4 active tracks</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span key={area} className="chip">
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-background/80 p-5">
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Build stance</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Clear interfaces, visible status, and product decisions that feel grounded in real usage instead of
                    portfolio filler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="language"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="section-hidden scroll-mt-24 py-8 sm:py-12"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="eyebrow">Design language</div>
              <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
                Editorial structure, product signals, and enough motion to keep the page alive.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              The site now behaves like a product logbook: large statements, compact evidence, and a visual system that
              makes active work feel intentional.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-6 md:grid-cols-3">
              {designPrinciples.map((principle) => (
                <article key={principle.title} className="project-card p-6">
                  <principle.icon className="h-5 w-5 text-signal" />
                  <h3 className="mt-5 font-display text-2xl">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.description}</p>
                </article>
              ))}
            </div>

            <aside className="panel p-6 sm:p-8">
              <div className="eyebrow">System tokens</div>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Palette</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Warm paper base, deep ink foreground, cobalt for system signal, and a restrained orange for emphasis.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Typography</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Expressive display type for the big ideas, quieter body copy for reading, and mono labels for metadata.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Motion</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Sections rise in on scroll, cards lift on hover, and the cursor only appears on devices that support fine
                    pointer interaction.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="section-hidden scroll-mt-24 py-8 sm:py-12"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="eyebrow">Current projects</div>
              <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl">The things I am actively building right now.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              These are the live lanes shaping the portfolio at the moment, from agent workflows to shipping product work and
              hackathon execution.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <article key={project.name} className="project-card p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="eyebrow">{project.category}</div>
                    <h3 className="mt-5 font-display text-3xl sm:text-[2rem]">{project.name}</h3>
                  </div>
                  <project.icon className={`h-6 w-6 ${project.accent === "accent" ? "text-accent" : project.accent === "signal" ? "text-signal" : "text-foreground"}`} />
                </div>

                <div className="mt-5">
                  <span className="inline-flex rounded-full bg-signal-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
                    {project.status}
                  </span>
                </div>

                <p className="mt-5 text-base leading-8 text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-sm leading-7 text-foreground/82">{project.emphasis}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-8 sm:py-12 lg:grid-cols-[1fr_1.1fr]">
          <article className="panel p-6 sm:p-8">
            <div className="eyebrow">Operating mode</div>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight">How I am structuring the work right now.</h2>
            <div className="mt-6 space-y-4">
              {operatingModes.map((mode, index) => (
                <div key={mode} className="flex gap-4 rounded-[1.4rem] border border-border/70 bg-background/70 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{mode}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel p-6 sm:p-8">
            <div className="eyebrow">What changed</div>
            <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight">This version of the site is now aligned to live work instead of placeholder portfolio content.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              The refresh replaces generic experience and thought sections with a clearer picture of what I am actually shipping:
              agent systems, product execution, and collaborative build environments.
            </p>
          </article>
        </section>

        <section
          id="contact"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="section-hidden scroll-mt-24 py-8 sm:py-12"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <article className="panel p-6 sm:p-8">
              <div className="eyebrow">Contact</div>
              <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
                Open to product engineering, AI product work, and sharp collaborations.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                If the work involves agent systems, frontend direction, or turning rough product ideas into something real, I am
                interested.
              </p>
              <Link href="mailto:khuluza0@gmail.com" className="primary-link mt-8 inline-flex">
                Send an email
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="panel p-6 sm:p-8">
              <div className="eyebrow">Elsewhere</div>
              <div className="mt-6 grid gap-4">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between rounded-[1.5rem] border border-border/70 bg-background/75 px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-signal" />
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{item.label}</div>
                        <div className="mt-1 text-sm text-foreground sm:text-base">{item.value}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition duration-300 group-hover:text-foreground" />
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </section>

        <footer className="border-t border-border/70 py-8">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Khuluza Tshabalala</span>
            <span className="font-mono uppercase tracking-[0.22em]">Agentic products / design systems / fast delivery</span>
          </div>
        </footer>
      </main>
    </div>
  )
}

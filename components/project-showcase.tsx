"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/portfolio"

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(projects[0].id)
  const reducedMotion = useReducedMotion()
  const project = projects.find((item) => item.id === selected) ?? projects[0]

  return (
    <div className="project-showcase">
      <div className="project-index" role="group" aria-label="Choose a project">
        {projects.map((item, index) => (
          <button type="button" key={item.id} className={`project-select ${selected === item.id ? "is-selected" : ""}`}
            aria-pressed={selected === item.id} aria-controls="project-detail" onClick={() => setSelected(item.id)}>
            <span className="project-number">0{index + 1}</span>
            <span><span className="project-name">{item.name}</span><span className="project-category">{item.category}</span></span>
            <ArrowUpRight className="project-arrow" size={21} aria-hidden="true" />
          </button>
        ))}
        <a className="text-link github-link" href="https://github.com/TheReal-KT" target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={16} /></a>
      </div>
      <div id="project-detail" className="project-detail" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={project.id} initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>
            <div className={`project-art tone-${project.tone}`}>
              <div className="art-top"><span>{project.name}<span className="art-dot">.</span></span><span className="small-label">Concept / workflow</span></div>
              <div className="art-headline">{project.headline.map((line) => <span key={line}>{line}</span>)}</div>
              <div className="workflow-strip">{project.steps.map((step, index) => <span key={step}><i>0{index + 1}</i>{step}{index < project.steps.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</span>)}</div>
              <div className="art-orbit" aria-hidden="true" />
            </div>
            <div className="project-description">
              <span className="project-status"><span className="status-dot" />{project.status}</span>
              <h3>{project.description}</h3>
              <p>{project.detail}</p>
              <a href={`mailto:khuluza0@gmail.com?subject=${encodeURIComponent(`Let’s talk about ${project.name}`)}`} className="text-link">Talk about {project.name} <ArrowUpRight size={16} /></a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}

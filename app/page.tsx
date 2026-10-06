import Image from "next/image"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"
import SiteNav from "@/components/site-nav"
import Reveal from "@/components/reveal"
import ProjectShowcase from "@/components/project-showcase"
import WorldGlobe from "@/components/world-globe"
import HeroSequence from "@/components/hero-sequence"
import IntroExperience, { ReplayIntro } from "@/components/intro-experience"
import { events, projects, socialLinks } from "@/lib/portfolio"

export default function Home() {
  return (
    <IntroExperience>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteNav />
      <main id="main">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <HeroSequence>
          <div className="hero-copy">
            <a href="#up-next" className="hero-label">Next stop: Dell Forum · 03 November 2026 <ArrowUpRight size={12} /></a>
            <h1 id="hero-title"><span className="hero-line">Curious mind.</span><span className="hero-line">Builder at heart.</span></h1>
            <p className="hero-intro">Hi, I’m Khuluza. I build thoughtful digital products.<br className="desktop-break" /> Full-stack engineering, AI agents, and a healthy<br className="desktop-break" /> curiosity for what comes next.</p>
            <div className="hero-actions">
              <a href="#work" className="button button-orange">Explore my work <ArrowRight size={18} /></a>
            </div>
            <div className="hero-location"><span><i className="status-dot" /><strong>5</strong> projects in motion</span><span><i className="status-dot dot-blue" />South Africa</span></div>
          </div>
          <div className="hero-world">
            <WorldGlobe />
          </div>
          </HeroSequence>
          <div className="now-strip page-width">
            <div><span className="small-label">Currently</span><p><span className="status-dot" />Building BLVNK <span className="muted">& exploring agent systems</span></p></div>
            <a href="#up-next"><span className="small-label">Up next / 03 Nov 2026</span><p>Dell Technologies Forum <ArrowUpRight size={17} /></p></a>
            <span className="strip-edition small-label">Portfolio<br />Edition 2026</span>
          </div>
        </section>

        <section id="work" className="work-section page-width" aria-labelledby="work-title">
          <Reveal className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Ideas, made real.</h2></div><p>A few things I’m building, questioning,<br className="desktop-break" /> and figuring out along the way.</p></Reveal>
          <Reveal><ProjectShowcase projects={projects} /></Reveal>
          <p className="work-footnote"><span>Always a work in progress.</span><span>Products / Agents / Research</span></p>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-layout page-width">
            <Reveal className="portrait-column">
              <div className="portrait-frame"><Image src="/KT_suit.jpg" alt="Khuluza Tshabalala in a navy suit" fill unoptimized loading="eager" sizes="(min-width: 900px) 420px, 85vw" className="portrait-image" /></div>
              <div className="portrait-caption"><span>Khuluza Tshabalala</span><span>Engineer. Builder. Always learning.</span></div>
            </Reveal>
            <Reveal className="about-copy" delay={0.1}>
              <p className="eyebrow">02 / The person behind the projects</p>
              <h2 id="about-title">Good work starts<br />with good questions.</h2>
              <p>I’m a full-stack product builder based in South Africa, working at the intersection of software, AI and the everyday problems worth solving.</p>
              <p>I care about how things work, how they feel, and whether they actually help someone. That takes curiosity, clear thinking, and a willingness to keep learning.</p>
              <div className="about-principles"><div><span>01</span><p>Understand the problem.</p></div><div><span>02</span><p>Make the complex feel clear.</p></div><div><span>03</span><p>Build. Learn. Keep going.</p></div></div>
              <a href="https://www.linkedin.com/in/khuluza-tshabalala-933161288/" target="_blank" rel="noreferrer" className="text-link">A little more about me <ArrowUpRight size={16} /></a>
            </Reveal>
          </div>
        </section>

        <section id="journal" className="journal-section page-width" aria-labelledby="journal-title">
          <Reveal className="section-heading"><div><p className="eyebrow">03 / Out in the world</p><h2 id="journal-title">Different rooms.<br />New perspectives.</h2></div><p>The journey goes beyond the screen.<br className="desktop-break" /> Here’s where I’ve been in 2026.</p></Reveal>
          <div className="event-grid">
            {events.map((event, index) => (
              <Reveal key={event.name} delay={index * 0.1}>
                <article className="event-entry">
                  <a className="event-image-link" href={event.source} target="_blank" rel="noreferrer" aria-label={`${event.name}: official event coverage`}>
                    <Image src={event.image} alt={event.alt} fill unoptimized loading="eager" sizes="(min-width: 900px) 560px, 90vw" className="event-image" />
                    <span className="event-badge">Attended / 2026</span><span className="image-arrow"><ArrowUpRight size={20} /></span>
                  </a>
                  <div className="event-meta"><time dateTime={event.dateTime}>{event.date}</time><span>{event.category}</span></div>
                  <h3>{event.name}</h3>
                  <p className="event-venue"><MapPin size={14} />{event.venue}</p>
                  <p className="event-description">{event.description}</p>
                  <a className="event-credit" href={event.source} target="_blank" rel="noreferrer">{event.credit} <ArrowUpRight size={12} /></a>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <article id="up-next" className="up-next" aria-labelledby="next-title">
              <div className="next-image"><Image src="/events/dell-forum-2026.jpg" alt="Dell Technologies Forum Johannesburg 2026 promotional artwork" fill unoptimized loading="eager" sizes="(min-width: 900px) 580px, 90vw" /></div>
              <div className="next-copy"><p className="eyebrow"><span className="status-dot" />Up next / Planning to attend</p><h3 id="next-title">See you at<br />Dell Technologies<br /><span className="serif-word">Forum.</span></h3><p className="next-date"><time dateTime="2026-11-03">03 November 2026</time><span>Kyalami Grand Prix Circuit, Johannesburg</span></p><p>Next on the calendar: a day exploring AI, modern infrastructure and the conversations connecting them.</p><a href="https://techcentral.co.za/dell-technologies-forum-2026-johannesburg/286759/" target="_blank" rel="noreferrer" className="text-link">Explore the event <ArrowUpRight size={16} /></a><span className="next-credit">Promotional imagery · Dell Technologies / TechCentral</span></div>
            </article>
          </Reveal>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <Reveal className="contact-content page-width"><p className="eyebrow">04 / Make a connection</p><h2 id="contact-title">Something on<br />your mind?</h2><p>A project, a conversation, or an interesting problem.<br />I’d love to hear about it.</p><a href="mailto:khuluza0@gmail.com" className="button button-orange">Let’s talk <ArrowUpRight size={18} /></a><a href="mailto:khuluza0@gmail.com" className="contact-email">khuluza0@gmail.com</a></Reveal>
          <div className="contact-decoration" aria-hidden="true">↗</div>
        </section>
      </main>
      <footer className="site-footer page-width"><a href="#home" className="wordmark" aria-label="Back to top">kt<span>.</span></a><p>© 2026 Khuluza Tshabalala</p><div>{socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={13} /></a>)}<ReplayIntro /><a href="#home">Back to top <ArrowUpRight size={13} /></a></div></footer>
    </IntroExperience>
  )
}

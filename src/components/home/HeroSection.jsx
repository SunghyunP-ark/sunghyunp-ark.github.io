import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './HeroSection.css'

const NAMES = ['Sunghyun Park', 'Sean Park']
const TYPE_SPEED   = 90   // ms per character (typing)
const DELETE_SPEED = 50   // ms per character (deleting)
const PAUSE_FULL   = 2200 // ms after fully typed
const PAUSE_EMPTY  = 400  // ms after fully deleted

function useTypewriter(names) {
  const [displayed, setDisplayed] = useState('')
  const [nameIdx, setNameIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'deleting'

  useEffect(() => {
    const target = names[nameIdx]
    let timer
    if (phase === 'typing') {
      if (displayed.length < target.length) {
        timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED)
      } else {
        timer = setTimeout(() => setPhase('deleting'), PAUSE_FULL)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED)
      } else {
        timer = setTimeout(() => {
          setNameIdx(i => (i + 1) % names.length)
          setPhase('typing')
        }, PAUSE_EMPTY)
      }
    }
    return () => clearTimeout(timer)
  }, [displayed, phase, nameIdx, names])

  return displayed
}

const SOCIAL = [
  { url: 'https://6rn-657.tistory.com',                    icon: 'fas fa-pen-nib',     title: 'Blog' },
  { url: 'https://x.com/bagseon82212157',                  icon: 'fab fa-twitter',     title: 'Twitter' },
  { url: 'https://www.linkedin.com/in/sunghyun-park-6rn/', icon: 'fab fa-linkedin-in', title: 'LinkedIn' },
  { url: 'https://github.com/SunghyunP-ark',               icon: 'fab fa-github',      title: 'GitHub' },
  { url: 'https://www.youtube.com/@SunghyunPark-n9v',      icon: 'fab fa-youtube',     title: 'YouTube' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function HeroSection() {
  const displayedName = useTypewriter(NAMES)

  return (
    <section id="about" className="section section-alt hero-section">
      <div className="container">
        <motion.div className="hero-inner" variants={container} initial="hidden" animate="show">
          <motion.div className="hero-photo-col" variants={item}>
            <div className="hero-photo-frame">
              <img src="/static/img/me_real.png" alt="Sunghyun Park" className="hero-photo" />
              <div className="hero-photo-glow" />
            </div>
            <div className="hero-name-card">
              <span className="hero-subtitle">Yonsei Biochem &amp; CS</span>
              <h1 className="hero-name">
                {displayedName}
                <span className="hero-cursor" aria-hidden="true">▌</span>
              </h1>
            </div>
            <div className="hero-social">
              {SOCIAL.map(s => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="hero-bio-col" variants={item}>
            <h3 className="hero-bio-title">Biography</h3>
            <div className="hero-bio-text">
              <p>
                Hello, my name is <strong>Sunghyun Park</strong>, but I go by <strong>Sean</strong> in English.
                I am an undergraduate student majoring in Biochemistry and Computer Science at{' '}
                <a href="https://www.yonsei.ac.kr/" target="_blank" rel="noopener noreferrer">Yonsei University</a>{' '}
                in Seoul, South Korea.
              </p>
              <p>
                I've been drawn to <strong>SYSTEMS</strong> since high school — first to the intricate systems
                of living cells. Over time that curiosity expanded beyond biology as I discovered how
                data-driven modeling can reveal structure in almost any complex process. The moment when
                AI-driven advances like AlphaFold reshaped structural biology crystallized something for me:{' '}
                <strong>AI isn't just a tool for analysis</strong> — it can be an instrument of discovery.
                Today, I want to build models that blend mechanistic insight with machine learning, and
                study how LLMs can reason faithfully and safely to support scientific practice.
              </p>
            </div>
            <motion.div variants={item}>
              <a className="btn-outline btn-outline-gold" href="/cv/sunghyun_park_cv.pdf" target="_blank">
                <i className="fas fa-file-pdf" /> Curriculum Vitae
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

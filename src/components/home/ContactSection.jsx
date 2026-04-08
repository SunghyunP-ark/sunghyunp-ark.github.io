import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle.jsx'
import './ContactSection.css'

function CopyItem({ icon, value }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="contact-item">
      <i className={`fas ${icon} contact-item__icon`} />
      <span className="contact-item__value">{value}</span>
      <button className="contact-item__copy" onClick={handleCopy} title="Copy">
        <motion.i
          className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}
          animate={{ scale: copied ? [1.3, 1] : 1 }}
          transition={{ duration: 0.2 }}
        />
      </button>
      {copied && (
        <motion.span
          className="contact-item__copied"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Copied!
        </motion.span>
      )}
    </div>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-inner">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <SectionTitle>Contact</SectionTitle>
            <p className="contact-tagline">
              Feel free to reach out for research collaborations, questions, or just to say hi.
            </p>
          </motion.div>
          <motion.div
            className="contact-items"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <CopyItem icon="fa-envelope" value="psh040@yonsei.ac.kr" />
            <CopyItem icon="fa-mobile-alt" value="+82-10-9115-0823" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

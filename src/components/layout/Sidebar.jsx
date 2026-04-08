import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'
import './Sidebar.css'

const HOME_SECTIONS = ['about', 'education', 'publications', 'topics', 'skills', 'experience', 'awards', 'contact']

const HOME_NAV = [
  { id: 'about',        icon: 'fa-home',          title: 'Home' },
  { id: 'education',    icon: 'fa-graduation-cap', title: 'Education' },
  { id: 'publications', icon: 'fa-file-alt',       title: 'Projects' },
  { id: 'topics',       icon: 'fa-lightbulb',      title: 'Topics of Interest' },
  { id: 'skills',       icon: 'fa-cogs',           title: 'Skills' },
  { id: 'experience',   icon: 'fa-briefcase',      title: 'Experience' },
  { id: 'awards',       icon: 'fa-trophy',         title: 'Awards & Honors' },
]

const PAGE_NAV = [
  { path: '/gallery', icon: 'fa-images',  title: 'Gallery' },
  { path: '/blog',    icon: 'fa-blog',    title: 'Blog' },
]

const SOCIAL = [
  { url: 'https://x.com/bagseon82212157',                 icon: 'fab fa-twitter',     title: 'Twitter' },
  { url: 'https://www.linkedin.com/in/sunghyun-park-6rn/', icon: 'fab fa-linkedin-in', title: 'LinkedIn' },
  { url: 'https://github.com/SunghyunP-ark',              icon: 'fab fa-github',      title: 'GitHub' },
  { url: 'https://www.youtube.com/@SunghyunPark-n9v',     icon: 'fab fa-youtube',     title: 'YouTube' },
]

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const activeSection = useScrollSpy(HOME_SECTIONS, 120)

  const handleSectionClick = (id) => {
    if (onMobileClose) onMobileClose()
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <Link to="/" onClick={() => { if (onMobileClose) onMobileClose() }}>SP</Link>
        </div>

        <nav className="sidebar__nav">
          {HOME_NAV.map(item => (
            <button
              key={item.id}
              className={`sidebar__item ${isHome && activeSection === item.id ? 'sidebar__item--active' : ''}`}
              onClick={() => handleSectionClick(item.id)}
              title={item.title}
            >
              <i className={`fas ${item.icon}`} />
              <span className="sidebar__tooltip">{item.title}</span>
            </button>
          ))}

          <div className="sidebar__divider" />

          {PAGE_NAV.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__item ${location.pathname.startsWith(item.path) ? 'sidebar__item--active' : ''}`}
              title={item.title}
              onClick={() => { if (onMobileClose) onMobileClose() }}
            >
              <i className={`fas ${item.icon}`} />
              <span className="sidebar__tooltip">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar__social">
          {SOCIAL.map(s => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title}>
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </aside>
    </>
  )
}

import { Link } from 'react-router-dom'
import './MobileHeader.css'

export default function MobileHeader({ onMenuToggle }) {
  return (
    <header className="mobile-header">
      <Link to="/" className="mobile-header__brand">Sunghyun Park</Link>
      <button className="mobile-header__toggle" onClick={onMenuToggle} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}

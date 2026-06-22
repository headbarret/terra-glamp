import { useState, useEffect } from 'react'

const NAV = [
  { label: 'Домики', id: 'cabins' },
  { label: 'Даты', id: 'calendar' },
  { label: 'Ритуалы', id: 'rituals' },
  { label: 'Контакты', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100, padding: '18px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgba(28,25,22,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(163,118,93,0.12)' : 'none',
        transition: 'all 0.5s ease',
      }}>
        {/* Logo */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.25rem', fontWeight: 500,
            color: '#EAE5DE', letterSpacing: '0.2em',
          }}>
            TERRA BORALIS
          </span>
        </button>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-desktop">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#C4BDB4', fontFamily: 'Inter',
                fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: 0, transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = '#A3765D'}
              onMouseLeave={e => e.target.style.color = '#C4BDB4'}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Burger button — mobile only */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px', flexDirection: 'column', gap: 5,
          }}
          aria-label="Меню"
        >
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: '#EAE5DE',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: '#EAE5DE',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: '#EAE5DE',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99,
        background: 'rgba(28,25,22,0.97)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 32,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.35s ease',
      }} className="nav-mobile-menu">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem', fontWeight: 300,
              color: '#EAE5DE', letterSpacing: '0.1em',
              padding: '8px 0',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

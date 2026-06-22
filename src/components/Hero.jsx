import { useEffect, useState } from 'react'

const WEATHER_MOCK = {
  temp: '+14',
  feels: '+11',
  condition: 'Туман в лесу',
  humidity: '87%',
  wind: '3 м/с',
}

const FogIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 14h18M3 18h18M3 10h18" opacity="0.5"/>
    <path d="M5 6a4 4 0 0 1 7.58-1.8A4.5 4.5 0 1 1 17.5 10H5a3 3 0 0 1 0-6"/>
  </svg>
)

const ThermometerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
)

const WindIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
  </svg>
)

const DropIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function Hero() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{ minHeight: '100svh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `linear-gradient(to bottom, rgba(28,25,22,0.55) 0%, rgba(30,41,34,0.45) 60%, rgba(28,25,22,0.82) 100%)`,
      }} />
      <video
        src={`${import.meta.env.BASE_URL}video/hero.mp4`}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: -1,
          filter: 'brightness(0.72) saturate(0.85)',
        }}
      />

      {/* Content center */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: '0 24px', maxWidth: 820,
        opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 1.4s cubic-bezier(.22,1,.36,1), transform 1.4s cubic-bezier(.22,1,.36,1)',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.28em',
          color: '#A3765D', textTransform: 'uppercase', marginBottom: 28, fontWeight: 400,
        }}>
          TERRA BORALIS — ЭКО-ГЛЭМПИНГ
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 8vw, 5rem)',
          fontWeight: 300, lineHeight: 1.18,
          color: '#EAE5DE', marginBottom: 28, fontStyle: 'italic',
        }}>
          Здесь главный звук — тишина.<br />
          <span style={{ fontStyle: 'normal', fontWeight: 400 }}>
            Всё остальное природа доделает сама.
          </span>
        </h1>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.88rem, 1.6vw, 1.05rem)',
          fontWeight: 300, color: '#C4BDB4', marginBottom: 48,
          lineHeight: 1.7, letterSpacing: '0.02em',
        }}>
          Глэмпинг в лесу, где время течёт иначе
        </p>

        <div>
          <button
            onClick={() => scrollTo('cabins')}
            style={{
              background: 'transparent', border: '1px solid #A3765D',
              color: '#EAE5DE', fontFamily: 'Inter, sans-serif',
              fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '14px 40px', borderRadius: 2, cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => { e.target.style.background = '#A3765D'; e.target.style.color = '#2C2825' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#EAE5DE' }}
          >
            Выбрать домик
          </button>
        </div>
      </div>

      {/* Weather widget */}
      <div className="hero-weather" style={{
        position: 'absolute', bottom: 40, left: 40,
        zIndex: 3,
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 1.8s cubic-bezier(.22,1,.36,1) 0.4s, transform 1.8s cubic-bezier(.22,1,.36,1) 0.4s',
      }}>
        <div style={{
          background: 'rgba(28,25,22,0.72)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(163,118,93,0.22)',
          borderRadius: 14, padding: '16px 22px',
          display: 'flex', flexDirection: 'column', gap: 12,
          minWidth: 200,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FogIcon />
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem', fontWeight: 300, color: '#EAE5DE', lineHeight: 1,
                }}>
                  {WEATHER_MOCK.temp}°
                </span>
                <span style={{ fontSize: 11, color: '#7a7470', fontFamily: 'Inter' }}>C</span>
              </div>
              <p style={{ fontSize: 11, color: '#C4BDB4', fontFamily: 'Inter', marginTop: 2, letterSpacing: '0.04em' }}>
                {WEATHER_MOCK.condition}
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 16,
            paddingTop: 10,
            borderTop: '1px solid rgba(163,118,93,0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7a7470' }}>
              <ThermometerIcon />
              <span style={{ fontSize: 11, fontFamily: 'Inter', color: '#C4BDB4' }}>
                ощущается {WEATHER_MOCK.feels}°
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7a7470' }}>
              <WindIcon />
              <span style={{ fontSize: 11, fontFamily: 'Inter', color: '#C4BDB4' }}>{WEATHER_MOCK.wind}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#7a7470' }}>
              <DropIcon />
              <span style={{ fontSize: 11, fontFamily: 'Inter', color: '#C4BDB4' }}>{WEATHER_MOCK.humidity}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#5a5450' }}>
            <LocationIcon />
            <span style={{ fontSize: 10, fontFamily: 'Inter', letterSpacing: '0.1em', color: '#5a5450' }}>КАРЕЛИЯ</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: 0.5,
      }}>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', fontFamily: 'Inter', color: '#EAE5DE' }}>ВНИЗ</span>
        <div style={{
          width: 1, height: 40, background: 'linear-gradient(to bottom, #EAE5DE, transparent)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-weather {
            bottom: 20px !important;
            left: 16px !important;
          }
          .hero-weather > div {
            padding: 12px 16px !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

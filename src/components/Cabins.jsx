import { useState } from 'react'

const CABINS = [
  {
    id: 'smola',
    name: 'СМОЛА',
    type: 'А-фрейм',
    shortDesc: 'Панорамные окна, камин, купель',
    description: 'Панорамные окна во всю стену — лес входит прямо в комнату. Камин-буржуйка из чугуна, которую затапливают с вечера. Персональная купель на террасе с видом на сосны.',
    price: '7 500',
    image: 'cabin-smola.jpg',
    features: ['Панорамные окна', 'Купель на террасе', 'Камин-буржуйка', 'До 2 гостей'],
  },
  {
    id: 'gnezdo',
    name: 'ГНЕЗДО',
    type: 'Сканди-лофт на сваях',
    shortDesc: 'Тёплый пол, балдахин, ручей',
    description: 'Тёплый пол из дерева, кровать с льняным балдахином. Платформа на сваях над ручьём — слышно, как он течёт под вами. Утром — туман над водой и абсолютная тишина.',
    price: '6 800',
    image: 'cabin-gnezdo.jpg',
    features: ['Тёплый пол', 'Балдахин', 'Выход к ручью', 'До 2 гостей'],
  },
  {
    id: 'mokh',
    name: 'МОХ',
    type: 'Геокуполь',
    shortDesc: 'Купол, проектор-небо, костровище',
    description: 'Прозрачный купол среди леса. Проектор превращает потолок в звёздное небо в любую погоду. Персональный костровищ с заготовленными дровами, вид на поляну с папоротниками.',
    price: '8 900',
    image: 'cabin-mokh.jpg',
    features: ['Проектор-небо', 'Личное костровище', 'Геокупол', 'До 3 гостей'],
  },
]

const FeatureIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="4" cy="4" r="1.5" fill="#A3765D" />
  </svg>
)

function CabinCard({ cabin, index, isActive, onToggle, isMobile }) {
  const delays = ['0s', '0.15s', '0.30s']

  const handleInteraction = () => {
    if (isMobile) {
      onToggle()
    }
  }

  return (
    <div
      onClick={handleInteraction}
      onMouseEnter={() => !isMobile && onToggle()}
      onMouseLeave={() => !isMobile && isActive && onToggle()}
      style={{
        borderRadius: 14,
        border: `1px solid ${isActive ? 'rgba(163,118,93,0.55)' : 'rgba(163,118,93,0.18)'}`,
        background: '#231f1c',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, flex 0.5s cubic-bezier(.22,1,.36,1)',
        boxShadow: isActive ? '0 20px 60px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.2)',
        flex: isActive ? '2 1 0' : '1 1 0',
        minWidth: 0,
        animation: `cabinFadeUp 0.8s cubic-bezier(.22,1,.36,1) ${delays[index]} both`,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Фото */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden', borderRadius: '14px 14px 0 0', flexShrink: 0 }}>
        <img
          src={`${import.meta.env.BASE_URL}images/${cabin.image}`}
          alt={cabin.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.8) saturate(0.9)',
            transition: 'transform 0.7s cubic-bezier(.22,1,.36,1)',
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
          }}
          onError={e => { e.target.style.background = '#1E2922'; e.target.src = '' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: isActive
            ? 'linear-gradient(to top, rgba(28,25,22,0.98) 0%, rgba(28,25,22,0.15) 60%)'
            : 'linear-gradient(to top, rgba(28,25,22,0.88) 0%, transparent 55%)',
          transition: 'background 0.5s ease',
        }} />
        {/* Бейдж типа */}
        <div style={{
          position: 'absolute', top: 18, left: 18,
          background: 'rgba(28,25,22,0.82)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(163,118,93,0.3)',
          borderRadius: 20, padding: '5px 14px',
          fontSize: 10, letterSpacing: '0.18em',
          color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase',
        }}>
          {cabin.type}
        </div>

        {/* Название */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 18px' }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 400,
            color: '#EAE5DE', letterSpacing: '0.06em',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {cabin.name}
          </h3>
          <p style={{
            fontFamily: 'Inter', fontSize: 12, color: '#C4BDB4',
            marginTop: 4, letterSpacing: '0.03em',
            opacity: isActive ? 0 : 1,
            transition: 'opacity 0.25s ease',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {cabin.shortDesc}
          </p>
        </div>
      </div>

      {/* Детальный контент */}
      <div style={{
        padding: isActive ? '22px 26px 28px' : '0 26px',
        maxHeight: isActive ? 400 : 0,
        overflow: 'hidden',
        opacity: isActive ? 1 : 0,
        transition: 'max-height 0.5s cubic-bezier(.22,1,.36,1), opacity 0.35s ease 0.1s, padding 0.4s ease',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: '#7a7470', fontFamily: 'Inter', letterSpacing: '0.05em' }}>стоимость</span>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: 500, color: '#A3765D', fontFamily: 'Inter' }}>
              {cabin.price} ₽
            </span>
            <span style={{ fontSize: 10, color: '#7a7470', fontFamily: 'Inter' }}> / сутки</span>
          </div>
        </div>

        <p style={{
          fontFamily: 'Inter', fontSize: 13, lineHeight: 1.75,
          color: '#C4BDB4', marginBottom: 18,
        }}>
          {cabin.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {cabin.features.map(f => (
            <span key={f} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(163,118,93,0.1)',
              border: '1px solid rgba(163,118,93,0.2)',
              borderRadius: 20, padding: '4px 12px',
              fontSize: 11, color: '#C4BDB4', fontFamily: 'Inter',
            }}>
              <FeatureIcon />
              {f}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{
            width: '100%', padding: '12px 0',
            background: 'transparent', border: '1px solid #A3765D',
            color: '#EAE5DE', fontFamily: 'Inter',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            borderRadius: 2, cursor: 'pointer',
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={e => { e.target.style.background = '#A3765D'; e.target.style.color = '#2C2825' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#EAE5DE' }}
        >
          Выбрать даты
        </button>
      </div>
    </div>
  )
}

export default function Cabins() {
  const [activeId, setActiveId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useState(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  })

  const handleToggle = (id) => {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <section id="cabins" style={{ padding: '120px 0 100px', background: '#2C2825', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${import.meta.env.BASE_URL}images/texture-cabins.jpg)`, backgroundSize: '900px auto', backgroundPosition: 'top left', backgroundRepeat: 'repeat', opacity: 0.5, filter: 'brightness(0.65)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(163,118,93,0.35) 30%, rgba(163,118,93,0.35) 70%, transparent)', zIndex: 1 }} />

      <div className="reveal" style={{ textAlign: 'center', marginBottom: 72, padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.3em', color: '#A3765D',
          fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 16,
        }}>
          АРХИТЕКТУРНЫЙ РЯД
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
          fontWeight: 300, color: '#EAE5DE', lineHeight: 1.2,
        }}>
          Наши домики
        </h2>
        <div style={{ width: 40, height: 1, background: '#A3765D', margin: '24px auto 0' }} />
        <p style={{
          fontFamily: 'Inter', fontSize: 12, color: '#7a7470',
          marginTop: 18, letterSpacing: '0.06em',
        }} className="cabins-hint">
          <span className="cabins-hint-desktop">Наведите на домик, чтобы узнать подробнее</span>
          <span className="cabins-hint-mobile">Нажмите на домик, чтобы узнать подробнее</span>
        </p>
      </div>

      {/* Cards — flex on desktop, column on mobile */}
      <div
        className="reveal cabins-grid"
        style={{
          display: 'flex',
          gap: 20,
          padding: '0 clamp(20px, 4vw, 64px)',
          maxWidth: 1400,
          margin: '0 auto',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {CABINS.map((cabin, i) => (
          <CabinCard
            key={cabin.id}
            cabin={cabin}
            index={i}
            isActive={activeId === cabin.id}
            onToggle={() => {
              if (isMobile) {
                handleToggle(cabin.id)
              } else {
                setActiveId(cabin.id)
              }
            }}
            isMobile={isMobile}
          />
        ))}
      </div>

      <style>{`
        .cabins-hint-mobile { display: none; }
        .cabins-hint-desktop { display: inline; }

        @media (max-width: 767px) {
          .cabins-grid {
            flex-direction: column !important;
          }
          .cabins-grid > div {
            flex: none !important;
            width: 100% !important;
          }
          .cabins-hint-mobile { display: inline; }
          .cabins-hint-desktop { display: none; }
        }
      `}</style>
    </section>
  )
}

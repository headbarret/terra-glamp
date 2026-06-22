const RITUALS = [
  {
    id: 'banya',
    title: 'Кедровая баня на дровах',
    subtitle: 'Жар по-чёрному',
    description: 'Веники, травы, выход к озеру. Настоящая баня без электричества — только огонь и вода.',
    image: 'ritual-banya.jpg',
    gridArea: 'banya',
    accent: '#A3765D',
  },
  {
    id: 'tropy',
    title: 'Прогулки по эко-тропам',
    subtitle: '7 маршрутов',
    description: 'Грибы, ягоды, клюква по сезону. От часовой прогулки до полного дня в лесу.',
    image: 'ritual-tropy.jpg',
    gridArea: 'tropy',
    accent: '#6B8F71',
  },
  {
    id: 'koster',
    title: 'Вечерний костёр с чаем',
    subtitle: 'Сбор трав в лесу',
    description: 'Завариваем на углях. Мёд с местной пасеки. Время идёт иначе, когда смотришь на огонь.',
    image: 'ritual-koster.jpg',
    gridArea: 'koster',
    accent: '#C4895A',
  },
  {
    id: 'lodki',
    title: 'Лодки на лесном озере',
    subtitle: 'На вёслах',
    description: 'Тишина, утки, отражение сосён в воде. Выдаём в любое время.',
    image: 'ritual-lodki.jpg',
    gridArea: 'lodki',
    accent: '#5B7A8A',
  },
]

function RitualTile({ ritual, tall }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        border: '1px solid rgba(163,118,93,0.18)',
        minHeight: tall ? 420 : 200,
        cursor: 'default',
        background: '#1E2922',
      }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('.ritual-img')
        if (img) img.style.transform = 'scale(1.07)'
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('.ritual-img')
        if (img) img.style.transform = 'scale(1)'
      }}
    >
      <img
        className="ritual-img"
        src={`${import.meta.env.BASE_URL}images/${ritual.image}`}
        alt={ritual.title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.55) saturate(0.8)',
          transition: 'transform 0.6s cubic-bezier(.22,1,.36,1)',
          transform: 'scale(1)',
        }}
        onError={e => { e.target.style.opacity = 0 }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(28,25,22,0.92) 0%, rgba(28,25,22,0.2) 60%, transparent 100%)',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: 2,
        background: `linear-gradient(to right, ${ritual.accent}, transparent)`,
      }} />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: tall ? '28px 24px' : '18px 18px' }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.22em', color: ritual.accent,
          fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 8,
        }}>
          {ritual.subtitle}
        </p>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: tall ? '1.7rem' : '1.25rem',
          fontWeight: 400, color: '#EAE5DE',
          marginBottom: 10, lineHeight: 1.25,
        }}>
          {ritual.title}
        </h3>
        <p style={{
          fontSize: 13, color: '#C4BDB4', fontFamily: 'Inter',
          lineHeight: 1.65,
          display: tall ? 'block' : 'none',
        }}>
          {ritual.description}
        </p>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  return (
    <section id="rituals" style={{ padding: '100px 24px', background: '#2C2825', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/texture-bento.jpg)', backgroundSize: '900px auto', backgroundPosition: 'top left', backgroundRepeat: 'repeat', opacity: 0.5, filter: 'brightness(0.65)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(163,118,93,0.35) 30%, rgba(163,118,93,0.35) 70%, transparent)', zIndex: 1 }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 14 }}>
            ЛЕСНЫЕ РИТУАЛЫ
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 300, color: '#EAE5DE',
          }}>
            Что здесь делают
          </h2>
          <div style={{ width: 40, height: 1, background: '#A3765D', margin: '22px auto 0' }} />
        </div>

        {/* Desktop: asymmetric bento grid */}
        <div className="bento-desktop" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: 16,
        }}>
          <div className="reveal" style={{ gridColumn: 'span 7' }}>
            <RitualTile ritual={RITUALS[0]} tall />
          </div>
          <div className="reveal reveal-delay-1" style={{ gridColumn: 'span 5' }}>
            <RitualTile ritual={RITUALS[1]} tall />
          </div>
          <div className="reveal reveal-delay-2" style={{ gridColumn: 'span 5' }}>
            <RitualTile ritual={RITUALS[2]} />
          </div>
          <div className="reveal reveal-delay-3" style={{ gridColumn: 'span 7' }}>
            <RitualTile ritual={RITUALS[3]} />
          </div>
        </div>

        {/* Mobile: 2-column grid */}
        <div className="bento-mobile" style={{ display: 'none', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          {RITUALS.map((ritual, i) => (
            <div key={ritual.id} className={`reveal reveal-delay-${i}`}>
              <RitualTile ritual={ritual} tall={false} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .bento-desktop { display: none !important; }
          .bento-mobile { display: grid !important; }
        }
      `}</style>
    </section>
  )
}

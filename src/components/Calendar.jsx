import { useState } from 'react'

const BASE_PRICE_PER_NIGHT = 6800

const PACKAGES = [
  {
    id: 'weekend',
    name: 'ВЫХОДНЫЕ ДЛЯ ДВОИХ',
    duration: '2 ночи',
    description: 'Любой домик, ужин при свечах, купель с травами, завтрак в постель.',
    price: 13600,
  },
  {
    id: 'solo',
    name: 'НАЕДИНЕ С КНИГОЙ',
    duration: '3 ночи · соло',
    description: 'Пледы, книги у камина, абсолютная тишина. Завтрак и ужин включены.',
    price: 20400,
  },
  {
    id: 'detox',
    name: 'НЕДЕЛЯ ДЕТОКСА',
    duration: '7 ночей',
    description: 'Отключение от сети, лесные маршруты, баня каждый день. Полный ресет.',
    price: 47600,
  },
]

const PKG_ICONS = [
  () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
]

function fmt(n) {
  return n.toLocaleString('ru') + ' ₽'
}

function nightsLabel(n) {
  if (n === 1) return 'ночь'
  if (n >= 2 && n <= 4) return 'ночи'
  return 'ночей'
}

const CalcIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="10" y2="10"/>
    <line x1="12" y1="10" x2="14" y2="10"/>
    <line x1="16" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="10" y2="14"/>
    <line x1="12" y1="14" x2="14" y2="14"/>
    <line x1="8" y1="18" x2="16" y2="18"/>
  </svg>
)

function MiniCalendar({ selectedDates, onSelect }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
  const DAYS = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

  const booked = new Set(['2025-06-18','2025-06-19','2025-06-20','2025-07-04','2025-07-05'])

  const firstDay = new Date(year, month, 1)
  const startDow = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const dateKey = (d) => `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
  const isToday = (d) => { const t = new Date(); return d === t.getDate() && month === t.getMonth() && year === t.getFullYear() }
  const isPast = (d) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const isSelected = (d) => selectedDates.includes(dateKey(d))
  const isBooked = (d) => booked.has(dateKey(d))
  const isInRange = (d) => {
    if (selectedDates.length < 2) return false
    const [a, b] = selectedDates.map(s => new Date(s)).sort((x, y) => x - y)
    const cur = new Date(year, month, d)
    return cur > a && cur < b
  }

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y-1) } else setMonth(m => m-1) }
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y+1) } else setMonth(m => m+1) }

  const handleClick = (d) => {
    if (isPast(d) || isBooked(d)) return
    const key = dateKey(d)
    onSelect(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key)
      if (prev.length >= 2) return [key]
      return [...prev, key].sort()
    })
  }

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div style={{ userSelect: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <button onClick={prev} style={navBtn}>‹</button>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', color: '#EAE5DE', fontWeight: 400 }}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={next} style={navBtn}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, color: '#7a7470', fontFamily: 'Inter', letterSpacing: '0.1em', padding: '4px 0' }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />
          const sel = isSelected(d)
          const range = isInRange(d)
          const past = isPast(d)
          const book = isBooked(d)
          const tod = isToday(d)
          return (
            <button
              key={d}
              onClick={() => handleClick(d)}
              disabled={past || book}
              style={{
                width: '100%', aspectRatio: '1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontFamily: 'Inter',
                borderRadius: 6, border: tod ? '1px solid rgba(163,118,93,0.5)' : '1px solid transparent',
                background: sel ? '#A3765D' : range ? 'rgba(163,118,93,0.18)' : 'transparent',
                color: past ? '#4a4643' : book ? '#5a5450' : sel ? '#2C2825' : '#EAE5DE',
                cursor: past || book ? 'default' : 'pointer',
                opacity: past ? 0.4 : 1,
                transition: 'all 0.25s ease',
                textDecoration: book ? 'line-through' : 'none',
                minHeight: 36,
              }}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const navBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#A3765D', fontSize: '1.5rem', padding: '4px 12px',
  borderRadius: 4, transition: 'opacity 0.2s',
  minWidth: 44, minHeight: 44,
}

export default function Calendar() {
  const [selectedDates, setSelectedDates] = useState([])
  const [hoveredPackage, setHoveredPackage] = useState(null)

  const nights = selectedDates.length === 2
    ? Math.round((new Date(selectedDates[1]) - new Date(selectedDates[0])) / 86400000)
    : 0

  const estimatedPrice = nights > 0 ? BASE_PRICE_PER_NIGHT * nights : 0

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="calendar" style={{ padding: '100px 24px', background: '#282420', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/texture-calendar.jpg)', backgroundSize: '900px auto', backgroundPosition: 'top left', backgroundRepeat: 'repeat', opacity: 0.5, filter: 'brightness(0.65)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(163,118,93,0.35) 30%, rgba(163,118,93,0.35) 70%, transparent)', zIndex: 1 }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 14 }}>
            ВЫБЕРИТЕ ВРЕМЯ
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 300, color: '#EAE5DE' }}>
            Календарь и пакеты уединения
          </h2>
        </div>

        <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
          {/* Календарь */}
          <div className="reveal">
            <div style={{
              background: 'rgba(44,40,37,0.6)',
              border: '1px solid rgba(163,118,93,0.2)',
              borderRadius: 12, padding: '24px 20px',
            }}>
              <MiniCalendar selectedDates={selectedDates} onSelect={setSelectedDates} />

              {selectedDates.length === 2 && (
                <div style={{
                  marginTop: 24,
                  padding: '18px 20px',
                  background: 'rgba(163,118,93,0.1)',
                  border: '1px solid rgba(163,118,93,0.28)',
                  borderRadius: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#C4BDB4' }}>
                      {new Date(selectedDates[0]).toLocaleDateString('ru', { day: 'numeric', month: 'short' })}
                      {' — '}
                      {new Date(selectedDates[1]).toLocaleDateString('ru', { day: 'numeric', month: 'short' })}
                    </span>
                    <span style={{ color: '#A3765D', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                      {nights} {nightsLabel(nights)}
                    </span>
                  </div>

                  <div style={{ paddingTop: 12, borderTop: '1px solid rgba(163,118,93,0.15)', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                      <CalcIcon />
                      <span style={{ fontSize: 10, color: '#7a7470', fontFamily: 'Inter', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Примерная стоимость
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.9rem', fontWeight: 400, color: '#EAE5DE', lineHeight: 1,
                      }}>
                        {fmt(estimatedPrice)}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: '#7a7470', fontFamily: 'Inter', marginTop: 5 }}>
                      от {BASE_PRICE_PER_NIGHT.toLocaleString('ru')} ₽ / ночь · зависит от выбранного домика
                    </p>
                  </div>

                  <button
                    onClick={scrollToContact}
                    style={{
                      width: '100%', padding: '12px 0',
                      background: '#A3765D', border: 'none',
                      color: '#2C2825', fontFamily: 'Inter',
                      fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                      borderRadius: 2, cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={e => e.target.style.opacity = '0.82'}
                    onMouseLeave={e => e.target.style.opacity = '1'}
                  >
                    Перейти к заявке
                  </button>
                </div>
              )}

              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { bg: '#A3765D', label: 'Выбрано' },
                    { bg: 'rgba(163,118,93,0.18)', label: 'Диапазон' },
                    { bg: 'transparent', border: '1px solid #4a4643', label: 'Занято' },
                  ].map(l => (
                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: l.bg, border: l.border || 'none' }} />
                      <span style={{ fontSize: 10, color: '#7a7470', fontFamily: 'Inter' }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Пакеты */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PACKAGES.map((pkg, i) => {
              const Icon = PKG_ICONS[i]
              const isHov = hoveredPackage === pkg.id
              return (
                <div
                  key={pkg.id}
                  className={`reveal reveal-delay-${i + 1}`}
                  onMouseEnter={() => setHoveredPackage(pkg.id)}
                  onMouseLeave={() => setHoveredPackage(null)}
                  onClick={() => setHoveredPackage(isHov ? null : pkg.id)}
                  style={{
                    background: isHov ? 'rgba(163,118,93,0.12)' : 'rgba(44,40,37,0.5)',
                    border: `1px solid ${isHov ? 'rgba(163,118,93,0.5)' : 'rgba(163,118,93,0.15)'}`,
                    borderRadius: 10, padding: '22px 26px',
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon />
                      <span style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: '0.16em', color: '#A3765D', textTransform: 'uppercase' }}>
                        {pkg.name}
                      </span>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#EAE5DE', flexShrink: 0, marginLeft: 12 }}>
                      {fmt(pkg.price)}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: '#A3765D', fontFamily: 'Inter', marginBottom: 8, opacity: 0.75 }}>
                    {pkg.duration}
                  </p>
                  <p style={{ fontSize: 13, color: '#C4BDB4', fontFamily: 'Inter', lineHeight: 1.65 }}>
                    {pkg.description}
                  </p>

                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isHov ? 56 : 0,
                    opacity: isHov ? 1 : 0,
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                    marginTop: isHov ? 16 : 0,
                  }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); scrollToContact() }}
                      style={{
                        padding: '10px 24px',
                        background: '#A3765D', border: 'none',
                        color: '#2C2825', fontFamily: 'Inter',
                        fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
                        borderRadius: 2, cursor: 'pointer',
                        transition: 'opacity 0.25s',
                      }}
                      onMouseEnter={e => e.target.style.opacity = '0.82'}
                      onMouseLeave={e => e.target.style.opacity = '1'}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              )
            })}

            <p style={{ fontSize: 11, color: '#5a5450', fontFamily: 'Inter', lineHeight: 1.6, paddingLeft: 2 }}>
              Цены указаны за домик «Гнездо» (от {BASE_PRICE_PER_NIGHT.toLocaleString('ru')} ₽/ночь). «Смола» — от 7 500 ₽, «Мох» — от 8 900 ₽.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .calendar-grid {
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}

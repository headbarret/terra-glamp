import { useState } from 'react'

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 5.55 5.55l.92-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="#A3765D"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.5" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const LeafSuccessIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A3765D" strokeWidth="1.2" strokeLinecap="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
)

const CONTACTS = [
  { Icon: PhoneIcon, label: 'Телефон', value: '+7 (921) 000-00-00', href: 'tel:+79210000000' },
  { Icon: TelegramIcon, label: 'Telegram', value: '@terraboralis', href: 'https://t.me/terraboralis' },
  { Icon: InstagramIcon, label: 'Instagram', value: '@terra.boralis', href: 'https://instagram.com/terra.boralis' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', messenger: 'telegram' })
  const [sent, setSent] = useState(false)

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.name || !form.phone) return
    setSent(true)
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    background: 'rgba(44,40,37,0.6)',
    border: '1px solid rgba(163,118,93,0.2)',
    borderRadius: 4, color: '#EAE5DE',
    fontFamily: 'Inter', fontSize: 14,
    outline: 'none', transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  }

  return (
    <section id="contact" style={{ padding: '100px 24px', background: '#252119', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${import.meta.env.BASE_URL}images/texture-contact.jpg)`, backgroundSize: '900px auto', backgroundPosition: 'top left', backgroundRepeat: 'repeat', opacity: 0.5, filter: 'brightness(0.65)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(163,118,93,0.35) 30%, rgba(163,118,93,0.35) 70%, transparent)', zIndex: 1 }} />
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 16 }}>
            ПРИГЛАШЕНИЕ В ЛЕС
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontStyle: 'italic', fontWeight: 300,
            color: '#EAE5DE', lineHeight: 1.25, marginBottom: 20,
          }}>
            Приезжай.
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 300, color: '#C4BDB4',
          }}>
            Мы оставим свет на веранде.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'start' }}>
          {/* Form */}
          <div className="reveal">
            {sent ? (
              <div style={{
                textAlign: 'center', padding: '48px 32px',
                background: 'rgba(163,118,93,0.08)',
                border: '1px solid rgba(163,118,93,0.25)',
                borderRadius: 10,
              }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                  <LeafSuccessIcon />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#EAE5DE', marginBottom: 12 }}>
                  Заявка отправлена
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#C4BDB4', lineHeight: 1.7 }}>
                  Мы свяжемся с вами в течение часа.<br />Свет на веранде уже горит.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 8 }}>
                    Имя
                  </label>
                  <input
                    type="text"
                    placeholder="Как вас зовут"
                    value={form.name}
                    onChange={e => handle('name', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(163,118,93,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(163,118,93,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 8 }}>
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={e => handle('phone', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(163,118,93,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(163,118,93,0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', color: '#A3765D', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 12 }}>
                    Мессенджер
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['telegram', 'whatsapp'].map(m => (
                      <button
                        key={m}
                        onClick={() => handle('messenger', m)}
                        style={{
                          flex: 1, padding: '11px 0',
                          border: `1px solid ${form.messenger === m ? '#A3765D' : 'rgba(163,118,93,0.2)'}`,
                          background: form.messenger === m ? 'rgba(163,118,93,0.15)' : 'transparent',
                          color: form.messenger === m ? '#A3765D' : '#7a7470',
                          fontFamily: 'Inter', fontSize: 11,
                          letterSpacing: '0.1em', textTransform: 'capitalize',
                          borderRadius: 4, cursor: 'pointer',
                          transition: 'all 0.3s',
                          minHeight: 44,
                        }}
                      >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={submit}
                  style={{
                    marginTop: 8, padding: '15px 0',
                    background: 'transparent',
                    border: '1px solid #A3765D',
                    color: '#EAE5DE',
                    fontFamily: 'Inter', fontSize: 11,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    borderRadius: 2, cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    minHeight: 48,
                  }}
                  onMouseEnter={e => { e.target.style.background = '#A3765D'; e.target.style.color = '#2C2825' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#EAE5DE' }}
                >
                  Зарезервировать отдых
                </button>
              </div>
            )}
          </div>

          {/* Map + Contacts */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <a
              href="https://maps.google.com/?q=Карелия,+эко-глэмпинг"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div style={{
                height: 200, borderRadius: 10,
                border: '1px solid rgba(163,118,93,0.2)',
                background: '#1a2418',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 12, cursor: 'pointer',
                transition: 'border-color 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(163,118,93,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(163,118,93,0.2)'}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 220" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                  <path d="M0 110 Q100 80 200 110 Q300 140 400 110" stroke="#A3765D" strokeWidth="1" fill="none" />
                  <path d="M0 90 Q150 60 400 90" stroke="#6B8F71" strokeWidth="0.5" fill="none" />
                  <path d="M100 0 L120 220" stroke="#A3765D" strokeWidth="0.5" fill="none" />
                  <path d="M280 0 L260 220" stroke="#A3765D" strokeWidth="0.5" fill="none" />
                  <circle cx="200" cy="110" r="6" fill="#A3765D" opacity="0.8" />
                  <circle cx="200" cy="110" r="12" stroke="#A3765D" strokeWidth="1" fill="none" opacity="0.4" />
                </svg>
                <MapPinIcon />
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#A3765D', letterSpacing: '0.12em', position: 'relative', zIndex: 1 }}>
                  Открыть на карте
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#7a7470', position: 'relative', zIndex: 1 }}>
                  Карелия, 280 км от Петербурга
                </span>
              </div>
            </a>

            <div style={{
              display: 'flex', flexDirection: 'column', gap: 14,
              padding: '24px 28px',
              background: 'rgba(44,40,37,0.5)',
              border: '1px solid rgba(163,118,93,0.15)',
              borderRadius: 10,
            }}>
              {CONTACTS.map(({ Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', transition: 'opacity 0.3s', minHeight: 44 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(163,118,93,0.12)', flexShrink: 0 }}>
                    <Icon />
                  </span>
                  <div>
                    <p style={{ fontSize: 10, color: '#7a7470', fontFamily: 'Inter', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 13, color: '#EAE5DE', fontFamily: 'Inter' }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-grid {
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}

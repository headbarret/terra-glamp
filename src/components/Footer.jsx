export default function Footer() {
  return (
    <footer style={{
      background: '#1a1714',
      padding: '48px 24px 36px',
      textAlign: 'center',
      borderTop: '1px solid rgba(163,118,93,0.1)',
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.5rem', fontWeight: 300,
        color: '#EAE5DE', marginBottom: 8, letterSpacing: '0.15em',
      }}>
        TERRA BORALIS
      </p>
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#5a5450', letterSpacing: '0.1em', marginBottom: 24 }}>
        ЭКО-ГЛЭМПИНГ · КАРЕЛИЯ
      </p>
      <div style={{ width: 30, height: 1, background: '#A3765D', margin: '0 auto 24px' }} />
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#4a4643' }}>
        © 2025 Terra Boralis. Тишина охраняется.
      </p>
    </footer>
  )
}

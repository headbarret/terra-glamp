import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cabins from './components/Cabins'
import Calendar from './components/Calendar'
import BentoGrid from './components/BentoGrid'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Global reveal observer
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll('.reveal:not(.visible)')
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      }, { threshold: 0.1 })
      els.forEach(el => io.observe(el))
      return io
    }

    // Observe after each section mounts; re-observe on mutation
    let io = observe()
    const mo = new MutationObserver(() => { io.disconnect(); io = observe() })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Cabins />
      <Calendar />
      <BentoGrid />
      <Contact />
      <Footer />
    </div>
  )
}

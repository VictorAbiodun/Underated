import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / winHeight) * 100
      setProgress(Math.min(scrolled, 100))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress-top" />
      <div className="scroll-progress" style={{ height: `${progress}%` }} />
    </>
  )
}


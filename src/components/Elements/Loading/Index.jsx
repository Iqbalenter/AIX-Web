import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import Logo from '../../../assets/Logo_Web.png'

export default function LoadingScreen({ done = false, onExited }) {
  const overlayRef = useRef(null)
  const waterRef = useRef(null)

  useEffect(() => {
    if (!overlayRef.current || !waterRef.current) return

    // Idle animation for waves (horizontal) handled by CSS keyframes
    // Vertical fill animation managed by GSAP timeline
    const tl = gsap.timeline({ paused: true })
    tl.to(waterRef.current, { yPercent: -100, duration: 2.2, ease: 'power2.out' })

    // Start with empty water (y at 0%)
    gsap.set(waterRef.current, { yPercent: 0 })

    // When "done" becomes true, fill to 100% then fade out overlay
    if (done) {
      tl.play().then(() => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          onComplete: () => {
            if (onExited) onExited()
          }
        })
      })
    }

    return () => {
      tl.kill()
    }
  }, [done])

  return (
    <div ref={overlayRef} className="loader-overlay">
      <div className="loader-container">
        <div className="logo-mask" style={{ WebkitMaskImage: `url(${Logo})`, maskImage: `url(${Logo})` }}>
          <div ref={waterRef} className="water-fill">
            <div className="water-wave" />
            <div className="water-wave water-wave--delay" />
          </div>
        </div>
      </div>
    </div>
  )
}



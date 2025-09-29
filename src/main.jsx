import { StrictMode, Suspense, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './style/index.css'
import './i18n'

import Home from './page/Home'
import Trading from './page/Trading'
import Charts from './page/Charts'
import { Web3Provider } from './lib/wagmi.jsx'
import LoadingScreen from './components/Elements/Loading/Index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/trading',
    element: <Trading/>
  },
  { path: '/charts/:symbol', 
    element: <Charts/> 
  },
])

function RootApp() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Init Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const cleanupLenis = () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }

    if (document.readyState === 'complete') {
      // Pastikan menunggu frame berikutnya untuk memberikan waktu mount
      requestAnimationFrame(() => setReady(true))
    } else {
      const onLoad = () => requestAnimationFrame(() => setReady(true))
      window.addEventListener('load', onLoad, { once: true })
      return () => {
        window.removeEventListener('load', onLoad)
        cleanupLenis()
      }
    }
    return () => cleanupLenis()
  }, [])

  const [hideLoader, setHideLoader] = useState(false)

  return (
    <StrictMode>
      <Suspense fallback={<div />}> 
        {!hideLoader && <LoadingScreen done={ready} onExited={() => setHideLoader(true)} />}
        <Web3Provider>
          <RouterProvider router={router}/>
        </Web3Provider>
      </Suspense>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<RootApp />)

import { StrictMode, Suspense, useEffect, useState } from 'react'
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
    if (document.readyState === 'complete') {
      // Pastikan menunggu frame berikutnya untuk memberikan waktu mount
      requestAnimationFrame(() => setReady(true))
    } else {
      const onLoad = () => requestAnimationFrame(() => setReady(true))
      window.addEventListener('load', onLoad, { once: true })
      return () => window.removeEventListener('load', onLoad)
    }
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

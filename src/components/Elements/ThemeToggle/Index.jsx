import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'theme'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return getSystemTheme()
}

function applyTheme(theme) {
  const root = document.documentElement
  if (!root) return
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  root.style.colorScheme = theme
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => getInitialTheme())

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored !== 'light' && stored !== 'dark') {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    if (media.addEventListener) media.addEventListener('change', handler)
    else media.addListener(handler)
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', handler)
      else media.removeListener(handler)
    }
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      className={`inline-flex items-center justify-center rounded-full border border-neutral-300/40 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-100 hover:bg-white dark:hover:bg-neutral-800 transition-colors h-9 w-9 ${className}`}
    >
      {isDark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 12 2.25Zm0 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V18a.75.75 0 0 1 .75-.75Zm9.75-6a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM6 12a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1 0-1.5H5.25A.75.75 0 0 1 6 12Zm12.728 6.728a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06Zm-11.336 0a.75.75 0 0 1-1.06 0  .75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06Zm11.336-11.336a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM7.392 7.392a.75.75 0 0 1-1.06 0L5.27 6.33a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.75 12.003a9.75 9.75 0 0 1-12.503 9.382.75.75 0 0 1-.161-1.348 7.5 7.5 0 0 0 9.231-9.231.75.75 0 0 1 1.348-.161 9.69 9.69 0 0 1 2.085 1.358Z" />
          <path d="M2.25 12a9.75 9.75 0 0 1 12.503-9.382.75.75 0 0 1 .161 1.348 7.5 7.5 0 0 0-9.231 9.231.75.75 0 0 1-1.348.161A9.686 9.686 0 0 1 2.25 12Z" />
        </svg>
      )}
    </button>
  )
}



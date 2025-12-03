import { FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './DarkmodeToggle.css'

const DarkmodeToggle: FunctionComponent = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Load saved theme or use system preference
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = saved ? saved === 'dark' : prefersDark

    setIsDark(initialDark)
    document.documentElement.setAttribute('data-theme', initialDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      class={`theme-toggle ${isDark ? 'dark' : ''}`}
      aria-label="Toggle dark mode"
    >
      <span class="sun">☀️</span>
      <span class="moon">🌙</span>
      <div class="slider" />
    </button>
  )
}

export default DarkmodeToggle

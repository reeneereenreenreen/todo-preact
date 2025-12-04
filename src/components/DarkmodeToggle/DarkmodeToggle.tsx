import { FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './DarkmodeToggle.css'
import { Icon } from '@components/Icon'

const DarkmodeToggle: FunctionComponent = () => {
  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>('system')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    } else {
      setTheme('system')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    }
  }, [])

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value as 'system' | 'dark' | 'light'
    setTheme(value)
    if (value === 'system') {
      localStorage.removeItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    } else {
      localStorage.setItem('theme', value)
      document.documentElement.setAttribute('data-theme', value)
    }
  }

  return (
    <div class="darkmode-toggle">
      <h3 class="darkmode-toggle__title">Theme</h3>
      <label>
        <input
          type="radio"
          name="theme"
          value="system"
          checked={theme === 'system'}
          onChange={handleChange}
        />
        
        System
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={handleChange}
        />
        <Icon name="sun" />
        Light
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={handleChange}
        />
        <Icon name="moon" />
        Dark
      </label>
    </div>
  )
}

export default DarkmodeToggle

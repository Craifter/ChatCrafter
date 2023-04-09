import React, { useEffect, useState } from 'react'
import { IconBrightnessUp, IconMoon } from '@tabler/icons-react'

export const LightSwitch: React.FC = () => {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    const updateTheme = (): void => {
      const newTheme = localStorage.getItem('theme') ?? 'light'
      toggleClass(newTheme === 'dark')
      setTheme(newTheme)
    }

    updateTheme()

    window.addEventListener('storage', updateTheme)
    return () => { window.removeEventListener('storage', updateTheme) }
  }, [])

  const toggleClass = (isDark: boolean): void => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    toggleClass(newTheme === 'dark')
    setTheme(newTheme)
  }
  return (
    <button className={'text-black dark:text-white'} onClick={toggleTheme}>
      {theme === 'dark'
        ? (<IconBrightnessUp size={24} />)
        : (<IconMoon size={24} />)
      }
    </button>
  )
}

import React, { useEffect, useState } from 'react';
import { IconBrightnessUp, IconMoon } from '@tabler/icons-react';

/**
 * This is a functional React component that displays a toggle button for switching between light and dark themes.
 * Should only be used once per page.
 */
export const LightSwitch: React.FC = () => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    /** Updates the theme based on the value in localStorage. */
    const updateTheme = (): void => {
      const newTheme = localStorage.getItem('theme') ?? 'light';
      toggleClass(newTheme === 'dark');
      setTheme(newTheme);
    };

    /** Updates the theme based on the system theme change . */
    const systemThemeChanged = (e: MediaQueryListEvent): void => {
      if (e.matches) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      updateTheme();
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', systemThemeChanged);

    updateTheme();

    window.addEventListener('storage', updateTheme);

    return () => {
      window.removeEventListener('storage', updateTheme);
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', systemThemeChanged);
    };
  }, []);

  /** Toggles the dark class on the document element. */
  const toggleClass = (isDark: boolean): void => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  /** Toggles the theme between light and dark. */
  const toggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    toggleClass(newTheme === 'dark');
    setTheme(newTheme);
  };

  return (
    <button className={'text-black dark:text-white'} onClick={toggleTheme} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      {theme === 'dark'
        ? (<IconBrightnessUp size={24} />)
        : (<IconMoon size={24} />)
      }
    </button>
  );
};

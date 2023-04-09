/** sets the dark mode for the application based on the user's preference */
export const initLightMode = (): void => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
    return
  } else if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('dark')
    return
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }

  document.documentElement.classList.remove('dark')
  localStorage.setItem('theme', 'light')
}

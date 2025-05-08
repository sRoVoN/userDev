import { useTheme } from 'next-themes'
import React from 'react'

export default function useToggleTheme() {
   const {theme, setTheme} = useTheme();

   const handleToggle = () => {
    setTheme( theme === "dark" ? "light": "dark")
   }
   return {
    theme,
    handleToggle
   }
}

import { useTheme } from 'next-themes'


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

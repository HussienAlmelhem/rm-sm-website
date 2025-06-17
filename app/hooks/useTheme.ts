"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./useLocalStorage"

export type Theme = "light" | "dark" | "system"

export interface CustomColors {
  facebook: string
  twitter: string
  instagram: string
  youtube: string
}

const defaultColors: CustomColors = {
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  instagram: "#E4405F",
  youtube: "#FF0000",
}

export function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>("theme", "system")
  const [storedColors, setStoredColors] = useLocalStorage<CustomColors>("customColors", defaultColors)
  const [storedHighContrast, setStoredHighContrast] = useLocalStorage<boolean>("highContrast", false)

  const [theme, setThemeState] = useState<Theme>(storedTheme)
  const [customColors, setCustomColorsState] = useState<CustomColors>(storedColors)
  const [highContrast, setHighContrastState] = useState<boolean>(storedHighContrast)
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark")

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    setStoredTheme(newTheme)
  }

  const setCustomColors = (newColors: CustomColors) => {
    setCustomColorsState(newColors)
    setStoredColors(newColors)
  }

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled)
    setStoredHighContrast(enabled)
  }

  const effectiveTheme = theme === "system" ? systemTheme : theme

  return {
    theme: effectiveTheme,
    originalTheme: theme,
    setTheme,
    customColors,
    setCustomColors,
    highContrast,
    setHighContrast,
    systemTheme,
  }
}

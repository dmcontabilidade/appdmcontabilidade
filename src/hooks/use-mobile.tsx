
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for resize with debounce for better performance
    let timeoutId: number | null = null
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(checkMobile, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Clean up
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

export function useBreakpoint(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isBelow, setIsBelow] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
    }
    return false
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    const handleChange = () => {
      setIsBelow(mql.matches)
    }
    
    // Modern event listener approach
    mql.addEventListener("change", handleChange)
    
    // Initial check
    handleChange()
    
    return () => mql.removeEventListener("change", handleChange)
  }, [breakpoint])

  return isBelow
}

import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}) {
  const ref = useRef(null)
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            setTimeout(() => {
              const duration = 2000
              const start = direction === "down" ? value : 0
              const end = direction === "down" ? 0 : value
              const startTime = performance.now()

              const animate = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3)
                
                const currentValue = start + (end - start) * easeOut
                setDisplayValue(currentValue)

                if (progress < 1) {
                  requestAnimationFrame(animate)
                }
              }

              requestAnimationFrame(animate)
            }, delay * 1000)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, direction, delay, hasAnimated])

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
    >
      {displayValue.toFixed(decimalPlaces)}
    </span>
  )
}

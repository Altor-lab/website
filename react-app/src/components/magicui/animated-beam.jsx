import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  endYOffset = 0,
  reverse = false,
  pathColor = "#30363d",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#34d399",
  gradientStopColor = "#3b82f6",
  delay = 0,
  duration = 3,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
}) {
  // Simplified beam that doesn't require refs - just a decorative animated line
  return null // We'll use CSS-based beams instead for simplicity
}

// CSS-based animated connection line
export function ConnectionLine({ className, vertical = false }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        vertical ? "w-px h-full" : "h-px w-full",
        className
      )}
    >
      <div
        className={cn(
          "absolute bg-gradient-to-r from-transparent via-emerald-500 to-transparent",
          vertical 
            ? "w-full h-20 animate-beam-vertical" 
            : "h-full w-20 animate-beam-horizontal"
        )}
      />
      <div
        className={cn(
          "absolute bg-[#30363d]",
          vertical ? "w-full h-full" : "h-full w-full"
        )}
      />
    </div>
  )
}

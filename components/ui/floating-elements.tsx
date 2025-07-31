"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

export function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 3000,
  direction = "up"
}: FloatingElementProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn(
        "animate-float",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface GlowElementProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
}

export function GlowElement({
  children,
  className,
  intensity = "medium"
}: GlowElementProps) {
  const getGlowClass = () => {
    switch (intensity) {
      case "low":
        return "animate-pulse-glow"
      case "medium":
        return "animate-pulse-glow"
      case "high":
        return "animate-pulse-glow"
      default:
        return "animate-pulse-glow"
    }
  }

  return (
    <div className={cn(getGlowClass(), className)}>
      {children}
    </div>
  )
}

interface GradientShiftProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
}

export function GradientShift({
  children,
  className,
  colors = ["from-cyan-500", "via-blue-500", "to-purple-500"]
}: GradientShiftProps) {
  const gradientClass = `bg-gradient-to-r ${colors.join(" ")} animate-gradient-shift`

  return (
    <div className={cn(gradientClass, className)}>
      {children}
    </div>
  )
} 
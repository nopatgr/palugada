"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({
  text,
  speed = 100,
  className,
  onComplete
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  animated?: boolean
}

export function GradientText({
  children,
  className,
  colors = ["from-cyan-400", "via-blue-500", "to-purple-500"],
  animated = true
}: GradientTextProps) {
  const gradientClass = `bg-gradient-to-r ${colors.join(" ")} bg-clip-text text-transparent`
  const animationClass = animated ? "animate-gradient-shift" : ""

  return (
    <span className={cn(gradientClass, animationClass, className)}>
      {children}
    </span>
  )
}

interface GlowTextProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "blue" | "purple"
  intensity?: "low" | "medium" | "high"
}

export function GlowText({
  children,
  className,
  glowColor = "cyan",
  intensity = "medium"
}: GlowTextProps) {
  const getGlowClasses = () => {
    const colorClasses = {
      cyan: "text-cyan-400",
      blue: "text-blue-400",
      purple: "text-purple-400"
    }

    const intensityClasses = {
      low: "drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]",
      medium: "drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]",
      high: "drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]"
    }

    return cn(
      colorClasses[glowColor],
      intensityClasses[intensity],
      className
    )
  }

  return (
    <span className={getGlowClasses()}>
      {children}
    </span>
  )
}

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
  suffix = "",
  prefix = ""
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setDisplayValue(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

interface FloatingTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FloatingText({
  children,
  className,
  delay = 0,
  duration = 3000
}: FloatingTextProps) {
  return (
    <span
      className={cn("animate-float", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </span>
  )
} 
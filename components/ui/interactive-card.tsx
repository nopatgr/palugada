"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "glow" | "scale" | "tilt" | "gradient"
  intensity?: "low" | "medium" | "high"
}

export function InteractiveCard({
  children,
  className,
  hoverEffect = "glow",
  intensity = "medium"
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getHoverClasses = () => {
    const baseClasses = "transition-all duration-300 ease-out"
    
    switch (hoverEffect) {
      case "glow":
        return cn(
          baseClasses,
          intensity === "low" && "hover:shadow-lg hover:shadow-cyan-500/20",
          intensity === "medium" && "hover:shadow-xl hover:shadow-cyan-500/30",
          intensity === "high" && "hover:shadow-2xl hover:shadow-cyan-500/50"
        )
      case "scale":
        return cn(
          baseClasses,
          intensity === "low" && "hover:scale-105",
          intensity === "medium" && "hover:scale-110",
          intensity === "high" && "hover:scale-125"
        )
      case "tilt":
        return cn(
          baseClasses,
          "hover:rotate-1 hover:skew-1"
        )
      case "gradient":
        return cn(
          baseClasses,
          "hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-purple-500/10"
        )
      default:
        return baseClasses
    }
  }

  return (
    <div
      className={cn(getHoverClasses(), className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "blue" | "purple"
  intensity?: "low" | "medium" | "high"
}

export function GlowCard({
  children,
  className,
  glowColor = "cyan",
  intensity = "medium"
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getGlowClasses = () => {
    const colorClasses = {
      cyan: "hover:shadow-cyan-500",
      blue: "hover:shadow-blue-500",
      purple: "hover:shadow-purple-500"
    }

    const intensityClasses = {
      low: "hover:shadow-lg",
      medium: "hover:shadow-xl",
      high: "hover:shadow-2xl"
    }

    return cn(
      "transition-all duration-300 ease-out",
      colorClasses[glowColor],
      intensityClasses[intensity]
    )
  }

  return (
    <div
      className={cn(getGlowClasses(), className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

interface GradientBorderCardProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  animated?: boolean
}

export function GradientBorderCard({
  children,
  className,
  colors = ["from-cyan-500", "via-blue-500", "to-purple-500"],
  animated = true
}: GradientBorderCardProps) {
  const gradientClass = `bg-gradient-to-r ${colors.join(" ")}`
  const animationClass = animated ? "animate-gradient-shift" : ""

  return (
    <div className={cn("p-0.5 rounded-lg", gradientClass, animationClass)}>
      <div className={cn("bg-slate-900 rounded-lg", className)}>
        {children}
      </div>
    </div>
  )
} 
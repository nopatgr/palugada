"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface InteractiveButtonProps {
  children: React.ReactNode
  className?: string
  effect?: "ripple" | "glow" | "scale" | "gradient"
  color?: "cyan" | "blue" | "purple"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function InteractiveButton({
  children,
  className,
  effect = "ripple",
  color = "cyan",
  size = "md",
  onClick
}: InteractiveButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (effect === "ripple") {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      }
      
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 600)
    }
    
    onClick?.()
  }

  const getColorClasses = () => {
    switch (color) {
      case "cyan":
        return "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      case "blue":
        return "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
      case "purple":
        return "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
      default:
        return "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
    }
  }

  const getEffectClasses = () => {
    switch (effect) {
      case "glow":
        return "hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
      case "scale":
        return "hover:scale-105 transition-transform duration-300"
      case "gradient":
        return "animate-gradient-shift"
      default:
        return "transition-all duration-300"
    }
  }

  return (
    <Button
      className={cn(
        getColorClasses(),
        getEffectClasses(),
        "relative overflow-hidden text-white font-semibold tracking-wide",
        className
      )}
      onClick={handleClick}
      size={size}
    >
      {children}
      
      {effect === "ripple" && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </Button>
  )
}

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "blue" | "purple"
  intensity?: "low" | "medium" | "high"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function GlowButton({
  children,
  className,
  glowColor = "cyan",
  intensity = "medium",
  size = "md",
  onClick
}: GlowButtonProps) {
  const getGlowClasses = () => {
    const colorClasses = {
      cyan: "shadow-cyan-500",
      blue: "shadow-blue-500",
      purple: "shadow-purple-500"
    }

    const intensityClasses = {
      low: "hover:shadow-lg",
      medium: "hover:shadow-xl",
      high: "hover:shadow-2xl"
    }

    return cn(
      "bg-slate-800 text-white border border-slate-600 hover:bg-slate-700",
      colorClasses[glowColor],
      intensityClasses[intensity],
      "transition-all duration-300 font-semibold tracking-wide",
      className
    )
  }

  return (
    <Button
      className={getGlowClasses()}
      onClick={onClick}
      size={size}
    >
      {children}
    </Button>
  )
}

interface GradientBorderButtonProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function GradientBorderButton({
  children,
  className,
  colors = ["from-cyan-500", "via-blue-500", "to-purple-500"],
  size = "md",
  onClick
}: GradientBorderButtonProps) {
  const gradientClass = `bg-gradient-to-r ${colors.join(" ")}`

  return (
    <div className={cn("p-0.5 rounded-lg", gradientClass)}>
      <Button
        className={cn(
          "bg-slate-900 text-white hover:bg-slate-800 font-semibold tracking-wide",
          className
        )}
        onClick={onClick}
        size={size}
      >
        {children}
      </Button>
    </div>
  )
} 
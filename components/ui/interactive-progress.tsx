"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface InteractiveProgressProps {
  value: number
  max?: number
  className?: string
  color?: "cyan" | "blue" | "purple" | "green" | "yellow" | "red"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  showLabel?: boolean
  label?: string
}

export function InteractiveProgress({
  value,
  max = 100,
  className,
  color = "cyan",
  size = "md",
  animated = true,
  showLabel = false,
  label
}: InteractiveProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value, animated])

  const percentage = (displayValue / max) * 100

  const getColorClasses = () => {
    switch (color) {
      case "cyan":
        return "bg-gradient-to-r from-cyan-500 to-blue-500"
      case "blue":
        return "bg-gradient-to-r from-blue-500 to-purple-500"
      case "purple":
        return "bg-gradient-to-r from-purple-500 to-cyan-500"
      case "green":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "yellow":
        return "bg-gradient-to-r from-yellow-500 to-orange-500"
      case "red":
        return "bg-gradient-to-r from-red-500 to-pink-500"
      default:
        return "bg-gradient-to-r from-cyan-500 to-blue-500"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-2"
      case "md":
        return "h-3"
      case "lg":
        return "h-4"
      default:
        return "h-3"
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-300 tracking-wide">
            {label || "Progress"}
          </span>
          <span className="text-sm font-medium text-cyan-400 tracking-wide">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn("w-full bg-slate-700 rounded-full overflow-hidden", getSizeClasses())}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            getColorClasses(),
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface CircularProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  color?: "cyan" | "blue" | "purple" | "green"
  showLabel?: boolean
  label?: string
  className?: string
}

export function CircularProgress({
  value,
  max = 100,
  size = "md",
  color = "cyan",
  showLabel = false,
  label,
  className
}: CircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const percentage = (displayValue / max) * 100
  const radius = size === "sm" ? 20 : size === "md" ? 30 : 40
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColorClasses = () => {
    switch (color) {
      case "cyan":
        return "stroke-cyan-500"
      case "blue":
        return "stroke-blue-500"
      case "purple":
        return "stroke-purple-500"
      case "green":
        return "stroke-green-500"
      default:
        return "stroke-cyan-500"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-16 h-16"
      case "md":
        return "w-24 h-24"
      case "lg":
        return "w-32 h-32"
      default:
        return "w-24 h-24"
    }
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", getSizeClasses())}>
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="rgb(51 65 85)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className={cn(getColorClasses(), "transition-all duration-1000 ease-out")}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white tracking-wide">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-slate-300 mt-2 tracking-wide">
          {label}
        </span>
      )}
    </div>
  )
}

interface StepProgressProps {
  steps: string[]
  currentStep: number
  className?: string
  color?: "cyan" | "blue" | "purple"
}

export function StepProgress({
  steps,
  currentStep,
  className,
  color = "cyan"
}: StepProgressProps) {
  const getColorClasses = () => {
    switch (color) {
      case "cyan":
        return "bg-cyan-500 border-cyan-500"
      case "blue":
        return "bg-blue-500 border-blue-500"
      case "purple":
        return "bg-purple-500 border-purple-500"
      default:
        return "bg-cyan-500 border-cyan-500"
    }
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300",
              index < currentStep
                ? getColorClasses()
                : "border-slate-600 text-slate-400"
            )}
          >
            {index < currentStep ? "✓" : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-16 h-0.5 mx-2 transition-all duration-300",
                index < currentStep - 1 ? getColorClasses() : "bg-slate-600"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
} 
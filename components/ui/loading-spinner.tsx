"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  color?: "cyan" | "blue" | "purple" | "white"
}

export function LoadingSpinner({
  size = "md",
  className,
  color = "cyan"
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  const colorClasses = {
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    white: "text-white"
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  )
}

interface LoadingDotsProps {
  className?: string
  color?: "cyan" | "blue" | "purple" | "white"
}

export function LoadingDots({
  className,
  color = "cyan"
}: LoadingDotsProps) {
  const colorClasses = {
    cyan: "bg-cyan-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
    white: "bg-white"
  }

  return (
    <div className={cn("flex space-x-1", className)}>
      <div
        className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          colorClasses[color]
        )}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          colorClasses[color]
        )}
        style={{ animationDelay: "150ms" }}
      />
      <div
        className={cn(
          "w-2 h-2 rounded-full animate-pulse",
          colorClasses[color]
        )}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  )
}

interface LoadingBarProps {
  className?: string
  color?: "cyan" | "blue" | "purple"
  progress?: number
}

export function LoadingBar({
  className,
  color = "cyan",
  progress = 0
}: LoadingBarProps) {
  const colorClasses = {
    cyan: "bg-gradient-to-r from-cyan-500 to-blue-500",
    blue: "bg-gradient-to-r from-blue-500 to-purple-500",
    purple: "bg-gradient-to-r from-purple-500 to-cyan-500"
  }

  return (
    <div className={cn("w-full bg-slate-700 rounded-full h-2", className)}>
      <div
        className={cn(
          "h-2 rounded-full transition-all duration-300 ease-out",
          colorClasses[color]
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
} 
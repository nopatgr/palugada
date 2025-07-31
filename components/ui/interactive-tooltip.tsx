"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

interface InteractiveTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  effect?: "glow" | "gradient" | "pulse" | "fade"
  position?: "top" | "bottom" | "left" | "right"
  delay?: number
}

export function InteractiveTooltip({
  children,
  content,
  className,
  effect = "glow",
  position = "top",
  delay = 0
}: InteractiveTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const getEffectClasses = () => {
    switch (effect) {
      case "glow":
        return "bg-gradient-to-br from-slate-800 to-slate-700 border-cyan-500/30 shadow-lg shadow-cyan-500/20"
      case "gradient":
        return "bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/50"
      case "pulse":
        return "bg-slate-800 border-cyan-500/50 animate-pulse"
      case "fade":
        return "bg-slate-800/90 backdrop-blur-sm border-slate-600"
      default:
        return "bg-gradient-to-br from-slate-800 to-slate-700 border-cyan-500/30"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild>
          <div
            className={cn("inline-block", className)}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side={position}
          className={cn(
            "text-white border text-sm font-medium tracking-wide",
            getEffectClasses()
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface InfoTooltipProps {
  children: React.ReactNode
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function InfoTooltip({
  children,
  title,
  description,
  icon,
  className
}: InfoTooltipProps) {
  return (
    <InteractiveTooltip
      content={
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-cyan-400">{icon}</span>}
            <span className="font-semibold">{title}</span>
          </div>
          {description && (
            <p className="text-slate-300 text-xs leading-relaxed">
              {description}
            </p>
          )}
        </div>
      }
      className={className}
      effect="gradient"
    >
      {children}
    </InteractiveTooltip>
  )
}

interface StatusTooltipProps {
  children: React.ReactNode
  status: "success" | "warning" | "error" | "info"
  message: string
  className?: string
}

export function StatusTooltip({
  children,
  status,
  message,
  className
}: StatusTooltipProps) {
  const getStatusClasses = () => {
    switch (status) {
      case "success":
        return "border-green-500/50 bg-gradient-to-br from-green-900/20 to-green-800/20"
      case "warning":
        return "border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20"
      case "error":
        return "border-red-500/50 bg-gradient-to-br from-red-900/20 to-red-800/20"
      case "info":
        return "border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-cyan-800/20"
      default:
        return "border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-cyan-800/20"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return "✓"
      case "warning":
        return "⚠"
      case "error":
        return "✗"
      case "info":
        return "ℹ"
      default:
        return "ℹ"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("inline-block", className)}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            "text-white border text-sm font-medium tracking-wide",
            getStatusClasses()
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{getStatusIcon()}</span>
            <span>{message}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 
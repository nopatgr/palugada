"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface NotificationProps {
  title: string
  message?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
  className?: string
  animated?: boolean
}

export function Notification({
  title,
  message,
  type = "info",
  duration = 5000,
  onClose,
  className,
  animated = true
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [animated])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-green-900/20 to-green-800/20",
          border: "border-green-500/50",
          icon: CheckCircle,
          iconColor: "text-green-400"
        }
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-900/20 to-red-800/20",
          border: "border-red-500/50",
          icon: AlertCircle,
          iconColor: "text-red-400"
        }
      case "warning":
        return {
          bg: "bg-gradient-to-r from-yellow-900/20 to-yellow-800/20",
          border: "border-yellow-500/50",
          icon: AlertTriangle,
          iconColor: "text-yellow-400"
        }
      case "info":
        return {
          bg: "bg-gradient-to-r from-cyan-900/20 to-cyan-800/20",
          border: "border-cyan-500/50",
          icon: Info,
          iconColor: "text-cyan-400"
        }
      default:
        return {
          bg: "bg-gradient-to-r from-cyan-900/20 to-cyan-800/20",
          border: "border-cyan-500/50",
          icon: Info,
          iconColor: "text-cyan-400"
        }
    }
  }

  const typeClasses = getTypeClasses()
  const IconComponent = typeClasses.icon

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full",
        "bg-gradient-to-br from-slate-800 to-slate-700",
        "border rounded-lg shadow-xl backdrop-blur-sm",
        typeClasses.border,
        typeClasses.bg,
        "transition-all duration-300 ease-out",
        isVisible && !isClosing ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <IconComponent className={cn("h-5 w-5 mt-0.5 flex-shrink-0", typeClasses.iconColor)} />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              {title}
            </h4>
            {message && (
              <p className="text-sm text-slate-300 mt-1 tracking-wide">
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface NotificationContainerProps {
  children: React.ReactNode
  className?: string
}

export function NotificationContainer({
  children,
  className
}: NotificationContainerProps) {
  return (
    <div className={cn("fixed top-4 right-4 z-50 space-y-2", className)}>
      {children}
    </div>
  )
}

interface ToastProps {
  title: string
  message?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
  className?: string
}

export function Toast({
  title,
  message,
  type = "info",
  duration = 3000,
  onClose,
  className
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onClose?.()
        }, 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-green-500 to-green-600",
          icon: CheckCircle
        }
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-500 to-red-600",
          icon: AlertCircle
        }
      case "warning":
        return {
          bg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
          icon: AlertTriangle
        }
      case "info":
        return {
          bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
          icon: Info
        }
      default:
        return {
          bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
          icon: Info
        }
    }
  }

  const typeClasses = getTypeClasses()
  const IconComponent = typeClasses.icon

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-sm w-full",
        "rounded-lg shadow-xl backdrop-blur-sm",
        typeClasses.bg,
        "transition-all duration-300 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className
      )}
    >
      <div className="p-4 text-white">
        <div className="flex items-start gap-3">
          <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold tracking-wide">
              {title}
            </h4>
            {message && (
              <p className="text-sm opacity-90 mt-1 tracking-wide">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
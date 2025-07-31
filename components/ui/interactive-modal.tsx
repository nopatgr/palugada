"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Button } from "./button"
import { X } from "lucide-react"

interface InteractiveModalProps {
  children: React.ReactNode
  trigger?: React.ReactNode
  title?: string
  description?: string
  className?: string
  effect?: "slide" | "fade" | "scale" | "rotate"
}

export function InteractiveModal({
  children,
  trigger,
  title,
  description,
  className,
  effect = "slide"
}: InteractiveModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getEffectClasses = () => {
    switch (effect) {
      case "slide":
        return "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-bottom-4"
      case "fade":
        return "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      case "scale":
        return "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      case "rotate":
        return "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:rotate-out-12 data-[state=open]:rotate-in-12"
      default:
        return "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-bottom-4"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open Modal</Button>}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 text-white",
          getEffectClasses(),
          className
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="text-white tracking-wide">
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-slate-300 tracking-wide">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="relative">
          {children}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ConfirmationModalProps {
  trigger?: React.ReactNode
  title?: string
  message?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
}

export function ConfirmationModal({
  trigger,
  title = "Konfirmasi",
  message = "Apakah Anda yakin ingin melanjutkan?",
  onConfirm,
  onCancel,
  confirmText = "Ya",
  cancelText = "Tidak",
  variant = "info"
}: ConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case "danger":
        return "border-red-500 bg-gradient-to-br from-red-900/20 to-red-800/20"
      case "warning":
        return "border-yellow-500 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20"
      case "info":
        return "border-cyan-500 bg-gradient-to-br from-cyan-900/20 to-cyan-800/20"
      default:
        return "border-cyan-500 bg-gradient-to-br from-cyan-900/20 to-cyan-800/20"
    }
  }

  const getButtonClasses = () => {
    switch (variant) {
      case "danger":
        return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
      case "info":
        return "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      default:
        return "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
    }
  }

  const handleConfirm = () => {
    onConfirm?.()
    setIsOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open Confirmation</Button>}
      </DialogTrigger>
      <DialogContent
        className={cn(
          "bg-gradient-to-br from-slate-800 to-slate-700 text-white",
          getVariantClasses()
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-white tracking-wide">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-slate-300 tracking-wide">
            {message}
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              className={cn(
                getButtonClasses(),
                "text-white font-semibold tracking-wide"
              )}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
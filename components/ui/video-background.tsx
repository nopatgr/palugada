"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
  children?: React.ReactNode
  overlay?: boolean
  overlayOpacity?: number
  position?: "center" | "top" | "bottom" | "top-shifted"
}

export function VideoBackground({
  src,
  poster,
  className = "",
  children,
  overlay = true,
  overlayOpacity = 0.6,
  position = "top-shifted",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      // Delay autoplay for mobile to prevent issues
      setTimeout(() => {
        video.play().catch((error) => {
          console.warn("Video autoplay failed:", error)
          setHasError(true)
        })
      }, isMobile ? 1000 : 100)
    }

    const handleError = () => {
      setHasError(true)
      console.warn("Video failed to load")
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)
    video.addEventListener("canplay", handleCanPlay)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [isMobile])

  const getObjectPosition = () => {
    switch (position) {
      case "top":
        return "object-top"
      case "bottom":
        return "object-bottom"
      case "top-shifted":
        return isMobile ? "object-[50%_25%]" : "object-[50%_10%]"
      default:
        return "object-center"
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${getObjectPosition()} transition-opacity duration-1000 ${
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/webm" />
        <source src={src.replace(".webm", ".mp4")} type="video/mp4" />
      </video>

      {/* Enhanced Fallback Background */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900/60 transition-opacity duration-1000"
          style={{ opacity: isLoaded && !hasError ? overlayOpacity : 0.8 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

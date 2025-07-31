"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Circle } from "lucide-react"
import { Button } from "./button"

interface CarouselItem {
  id: string | number
  content: React.ReactNode
  title?: string
  description?: string
}

interface InteractiveCarouselProps {
  items: CarouselItem[]
  className?: string
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  effect?: "slide" | "fade" | "zoom"
}

export function InteractiveCarousel({
  items,
  className,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  effect = "slide"
}: InteractiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, currentIndex, items.length])

  const nextSlide = () => {
    if (isTransitioning || items.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    if (isTransitioning || items.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const getEffectClasses = () => {
    switch (effect) {
      case "fade":
        return "transition-opacity duration-300"
      case "zoom":
        return "transition-transform duration-300"
      default:
        return "transition-transform duration-300"
    }
  }

  const getTransformStyle = (index: number) => {
    if (effect === "fade") {
      return {
        opacity: index === currentIndex ? 1 : 0,
        zIndex: index === currentIndex ? 10 : 0,
      }
    } else if (effect === "zoom") {
      const scale = index === currentIndex ? 1 : 0.8
      const opacity = index === currentIndex ? 1 : 0.3
      return {
        transform: `scale(${scale})`,
        opacity,
        zIndex: index === currentIndex ? 10 : 0,
      }
    } else {
      // Slide effect
      const translateX = (index - currentIndex) * 100
      return {
        transform: `translateX(${translateX}%)`,
        zIndex: index === currentIndex ? 10 : 0,
      }
    }
  }

  if (!items || items.length === 0) {
    return (
      <div className={cn("flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg", className)}>
        <p className="text-slate-500 dark:text-slate-400">No items to display</p>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 w-full h-full",
              getEffectClasses()
            )}
            style={getTransformStyle(index)}
          >
            <div className="w-full h-full">
              {item.content}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
            onClick={prevSlide}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
            onClick={nextSlide}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              )}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Content Overlay */}
      {items[currentIndex]?.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-10">
          <h3 className="text-white font-semibold text-lg mb-2">
            {items[currentIndex].title}
          </h3>
          {items[currentIndex].description && (
            <p className="text-white/90 text-sm">
              {items[currentIndex].description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

interface ImageCarouselProps {
  images: Array<{
    id: string | number
    src: string
    alt: string
    title?: string
    description?: string
  }>
  className?: string
  height?: string
  autoPlay?: boolean
  interval?: number
}

export function ImageCarousel({
  images,
  className,
  height = "h-64",
  autoPlay = true,
  interval = 5000
}: ImageCarouselProps) {
  const carouselItems: CarouselItem[] = images.map((image) => ({
    id: image.id,
    content: (
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
    ),
    title: image.title,
    description: image.description
  }))

  return (
    <InteractiveCarousel
      items={carouselItems}
      className={cn(height, className)}
      autoPlay={autoPlay}
      interval={interval}
      effect="slide"
    />
  )
}

interface CardCarouselProps {
  cards: Array<{
    id: string | number
    content: React.ReactNode
    title?: string
    description?: string
  }>
  className?: string
  autoPlay?: boolean
  interval?: number
}

export function CardCarousel({
  cards,
  className,
  autoPlay = true,
  interval = 5000
}: CardCarouselProps) {
  const carouselItems: CarouselItem[] = cards.map((card) => ({
    id: card.id,
    content: card.content,
    title: card.title,
    description: card.description
  }))

  return (
    <InteractiveCarousel
      items={carouselItems}
      className={className}
      autoPlay={autoPlay}
      interval={interval}
      effect="fade"
    />
  )
} 
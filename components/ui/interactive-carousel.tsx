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
    if (!autoPlay) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, currentIndex])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
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
    switch (effect) {
      case "fade":
        return {
          opacity: index === currentIndex ? 1 : 0,
          transform: "translateX(0)"
        }
      case "zoom":
        return {
          opacity: index === currentIndex ? 1 : 0,
          transform: index === currentIndex ? "scale(1)" : "scale(0.8)"
        }
      default:
        return {
          opacity: 1,
          transform: `translateX(-${currentIndex * 100}%)`
        }
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Carousel Container */}
      <div className="relative h-full">
        <div
          className={cn(
            "flex h-full",
            effect === "slide" ? "transition-transform duration-300" : ""
          )}
          style={
            effect === "slide"
              ? { transform: `translateX(-${currentIndex * 100}%)` }
              : {}
          }
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "w-full flex-shrink-0",
                getEffectClasses()
              )}
              style={getTransformStyle(index)}
            >
              <div className="relative h-full">
                {item.content}
                {(item.title || item.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                    {item.title && (
                      <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-slate-200 tracking-wide">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/50 hover:bg-slate-700/50 text-white border-0 rounded-full w-10 h-10 p-0 backdrop-blur-sm"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/50 hover:bg-slate-700/50 text-white border-0 rounded-full w-10 h-10 p-0 backdrop-blur-sm"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-cyan-400 scale-125"
                  : "bg-slate-400 hover:bg-slate-300"
              )}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100 ease-linear"
            style={{
              width: `${((currentIndex + 1) / items.length) * 100}%`
            }}
          />
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
    title: string
    description: string
    icon?: React.ReactNode
    color?: "cyan" | "blue" | "purple"
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
    content: (
      <div className="p-6 h-full flex flex-col justify-center">
        <div className="text-center">
          {card.icon && (
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              {card.icon}
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
            {card.title}
          </h3>
          <p className="text-slate-300 tracking-wide">
            {card.description}
          </p>
        </div>
      </div>
    )
  }))

  return (
    <InteractiveCarousel
      items={carouselItems}
      className={cn("h-64", className)}
      autoPlay={autoPlay}
      interval={interval}
      effect="fade"
    />
  )
} 
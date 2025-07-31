"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ChartData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: ChartData[]
  className?: string
  height?: number
  animated?: boolean
}

export function BarChart({
  data,
  className,
  height = 200,
  animated = true
}: BarChartProps) {
  const [displayData, setDisplayData] = useState<ChartData[]>([])

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayData(data)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayData(data)
    }
  }, [data, animated])

  const maxValue = Math.max(...data.map(d => d.value))

  const getColorClasses = (index: number) => {
    const colors = [
      "from-cyan-500 to-blue-500",
      "from-blue-500 to-purple-500",
      "from-purple-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500"
    ]
    return colors[index % colors.length]
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between h-48 space-x-2">
        {displayData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-full rounded-t-lg transition-all duration-1000 ease-out",
                `bg-gradient-to-t ${getColorClasses(index)}`
              )}
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                minHeight: "4px"
              }}
            />
            <span className="text-xs text-slate-400 mt-2 text-center tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface LineChartProps {
  data: ChartData[]
  className?: string
  height?: number
  animated?: boolean
}

export function LineChart({
  data,
  className,
  height = 200,
  animated = true
}: LineChartProps) {
  const [displayData, setDisplayData] = useState<ChartData[]>([])

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayData(data)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayData(data)
    }
  }, [data, animated])

  const maxValue = Math.max(...data.map(d => d.value))
  const points = displayData.map((item, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (item.value / maxValue) * 100
  }))

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')

  return (
    <div className={cn("w-full", className)}>
      <svg
        width="100%"
        height={height}
        className="overflow-visible"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100%"
            y2={y}
            stroke="rgb(51 65 85)"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Line path */}
        <path
          d={pathData}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="4"
            fill="#06b6d4"
            className="transition-all duration-1000 ease-out"
          />
        ))}
      </svg>
    </div>
  )
}

interface DonutChartProps {
  data: ChartData[]
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function DonutChart({
  data,
  className,
  size = "md",
  animated = true
}: DonutChartProps) {
  const [displayData, setDisplayData] = useState<ChartData[]>([])

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayData(data)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayData(data)
    }
  }, [data, animated])

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = size === "sm" ? 40 : size === "md" ? 60 : 80
  const strokeWidth = size === "sm" ? 8 : size === "md" ? 12 : 16

  const getColorClasses = (index: number) => {
    const colors = [
      "stroke-cyan-500",
      "stroke-blue-500",
      "stroke-purple-500",
      "stroke-green-500",
      "stroke-yellow-500"
    ]
    return colors[index % colors.length]
  }

  let currentAngle = -90
  const segments = displayData.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    
    currentAngle += angle

    const x1 = radius + Math.cos((startAngle * Math.PI) / 180) * radius
    const y1 = radius + Math.sin((startAngle * Math.PI) / 180) * radius
    const x2 = radius + Math.cos((endAngle * Math.PI) / 180) * radius
    const y2 = radius + Math.sin((endAngle * Math.PI) / 180) * radius

    const largeArcFlag = angle > 180 ? 1 : 0

    const pathData = [
      `M ${radius} ${radius}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')

    return {
      pathData,
      color: getColorClasses(index),
      label: item.label,
      percentage
    }
  })

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <svg
          width={radius * 2}
          height={radius * 2}
          className="transform -rotate-90"
        >
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.pathData}
              className={cn(
                segment.color,
                "transition-all duration-1000 ease-out"
              )}
              fill="currentColor"
            />
          ))}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-white tracking-wide">
              {Math.round(total)}
            </div>
            <div className="text-xs text-slate-400 tracking-wide">
              Total
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", segment.color.replace("stroke-", "bg-"))} />
            <span className="text-sm text-slate-300 tracking-wide">
              {segment.label} ({Math.round(segment.percentage)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 
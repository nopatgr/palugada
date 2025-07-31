"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

interface InteractiveTabsProps {
  items: TabItem[]
  className?: string
  defaultTab?: string
  variant?: "default" | "pills" | "underline"
  animated?: boolean
}

export function InteractiveTabs({
  items,
  className,
  defaultTab,
  variant = "default",
  animated = true
}: InteractiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || "")

  const getTabClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 tracking-wide"
    
    if (isDisabled) {
      return cn(baseClasses, "text-slate-500 cursor-not-allowed")
    }

    switch (variant) {
      case "pills":
        return cn(
          baseClasses,
          isActive
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
            : "text-slate-300 hover:text-white hover:bg-slate-700/50"
        )
      case "underline":
        return cn(
          "px-4 py-2 border-b-2 font-medium transition-all duration-300 tracking-wide",
          isActive
            ? "border-cyan-500 text-cyan-400"
            : "border-transparent text-slate-300 hover:text-white hover:border-slate-500"
        )
      default:
        return cn(
          baseClasses,
          isActive
            ? "bg-slate-700 text-white"
            : "text-slate-300 hover:text-white hover:bg-slate-700/50"
        )
    }
  }

  const getContentClasses = () => {
    return cn(
      "mt-4",
      animated && "transition-all duration-300 ease-out"
    )
  }

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b border-slate-700">
        {items.map((item) => {
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && setActiveTab(item.id)}
              className={getTabClasses(isActive, item.disabled || false)}
              disabled={item.disabled}
            >
              <div className="flex items-center gap-2">
                {item.icon && (
                  <span className={cn(
                    "transition-all duration-300",
                    isActive ? "text-cyan-400" : "text-slate-400"
                  )}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className={getContentClasses()}>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "transition-all duration-300 ease-out",
              activeTab === item.id
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 absolute pointer-events-none"
            )}
          >
            {activeTab === item.id && item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

interface ServiceTabsProps {
  services: Array<{
    id: string
    name: string
    description: string
    features: string[]
    price: string
    icon?: React.ReactNode
  }>
  className?: string
}

export function ServiceTabs({
  services,
  className
}: ServiceTabsProps) {
  const tabItems: TabItem[] = services.map((service) => ({
    id: service.id,
    label: service.name,
    icon: service.icon,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
            {service.name}
          </h3>
          <p className="text-slate-300 leading-relaxed tracking-wide">
            {service.description}
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-cyan-400 tracking-wide">
            Fitur Utama:
          </h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                <span className="tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4 border-t border-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-cyan-400">
              {service.price}
            </span>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold tracking-wide hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
              Pilih Layanan
            </button>
          </div>
        </div>
      </div>
    )
  }))

  return (
    <InteractiveTabs
      items={tabItems}
      className={className}
      variant="pills"
      animated={true}
    />
  )
}

interface FeatureTabsProps {
  features: Array<{
    id: string
    title: string
    description: string
    benefits: string[]
    icon?: React.ReactNode
  }>
  className?: string
}

export function FeatureTabs({
  features,
  className
}: FeatureTabsProps) {
  const tabItems: TabItem[] = features.map((feature) => ({
    id: feature.id,
    label: feature.title,
    icon: feature.icon,
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          {feature.icon && (
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              {feature.icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
              {feature.title}
            </h3>
            <p className="text-slate-300 leading-relaxed tracking-wide">
              {feature.description}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-cyan-400 tracking-wide">
            Manfaat:
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {feature.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                <span className="text-slate-300 tracking-wide text-sm">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }))

  return (
    <InteractiveTabs
      items={tabItems}
      className={className}
      variant="default"
      animated={true}
    />
  )
} 
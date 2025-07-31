"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
  color?: "cyan" | "blue" | "purple"
}

interface InteractiveAccordionProps {
  items: AccordionItem[]
  className?: string
  type?: "single" | "multiple"
  defaultOpen?: string[]
  animated?: boolean
}

export function InteractiveAccordion({
  items,
  className,
  type = "single",
  defaultOpen = [],
  animated = true
}: InteractiveAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (itemId: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(itemId) ? [] : [itemId])
    } else {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    }
  }

  const getColorClasses = (color: string = "cyan") => {
    switch (color) {
      case "cyan":
        return "border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
      case "blue":
        return "border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
      case "purple":
        return "border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
      default:
        return "border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        const colorClasses = getColorClasses(item.color)

        return (
          <div
            key={item.id}
            className={cn(
              "border rounded-lg overflow-hidden transition-all duration-300",
              isOpen ? colorClasses : "border-slate-600 bg-slate-800/50",
              animated && "hover:border-slate-500"
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full px-4 py-3 flex items-center justify-between text-left transition-all duration-300",
                isOpen ? "text-white" : "text-slate-300 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-700 text-slate-400"
                  )}>
                    {item.icon}
                  </div>
                )}
                <span className="font-medium tracking-wide">
                  {item.title}
                </span>
              </div>
              <div className={cn(
                "transition-transform duration-300",
                isOpen ? "rotate-180" : "rotate-0"
              )}>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-cyan-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </button>
            
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 pb-3 text-slate-300 tracking-wide">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface FAQAccordionProps {
  faqs: Array<{
    id: string
    question: string
    answer: string
    category?: string
  }>
  className?: string
}

export function FAQAccordion({
  faqs,
  className
}: FAQAccordionProps) {
  const accordionItems: AccordionItem[] = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: (
      <div className="space-y-2">
        <p className="text-slate-300 leading-relaxed">
          {faq.answer}
        </p>
        {faq.category && (
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
            {faq.category}
          </div>
        )}
      </div>
    ),
    color: "cyan"
  }))

  return (
    <InteractiveAccordion
      items={accordionItems}
      className={className}
      type="single"
      animated={true}
    />
  )
}

interface ServiceAccordionProps {
  services: Array<{
    id: string
    title: string
    description: string
    features: string[]
    price?: string
    icon?: React.ReactNode
  }>
  className?: string
}

export function ServiceAccordion({
  services,
  className
}: ServiceAccordionProps) {
  const accordionItems: AccordionItem[] = services.map((service, index) => ({
    id: service.id,
    title: service.title,
    content: (
      <div className="space-y-4">
        <p className="text-slate-300 leading-relaxed">
          {service.description}
        </p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-cyan-400 tracking-wide">
            Fitur Utama:
          </h4>
          <ul className="space-y-1">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {service.price && (
          <div className="pt-2 border-t border-slate-600">
            <span className="text-lg font-bold text-cyan-400">
              {service.price}
            </span>
          </div>
        )}
      </div>
    ),
    icon: service.icon,
    color: index % 3 === 0 ? "cyan" : index % 3 === 1 ? "blue" : "purple"
  }))

  return (
    <InteractiveAccordion
      items={accordionItems}
      className={className}
      type="single"
      animated={true}
    />
  )
} 
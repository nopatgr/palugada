import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Users } from 'lucide-react'
import { Service } from '@/types/service'

interface ServiceCardProps  {
  service: Service
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full w-80 mx-2 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={service.featured ? "default" : "secondary"}>
            {service.category}
          </Badge>
          {service.featured && (
            <Badge variant="destructive" className="text-xs">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {service.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img 
            src={service.image || `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(service.title)}`}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{service.rating}</span>
            <span>({service.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{service.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{service.clientsServed}+ clients served</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="text-2xl font-bold text-primary">${service.price}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button className="w-full" size="lg">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  )
}

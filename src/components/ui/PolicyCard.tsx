import { Icon } from './Icon'
import { Card, CardContent } from './Card'

interface PolicyCardProps {
  icon: string
  title: string
  description: string
  points: string[]
}

export function PolicyCard({ icon, title, description, points }: PolicyCardProps) {
  return (
    <Card hover className="group p-10 border border-primary/5 hover:border-accent-gold/30">
      <CardContent>
        <div className="w-16 h-16 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
          <Icon name={icon} className="text-accent-gold" size="lg" weight={500} />
        </div>
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <p className="text-primary/60 leading-relaxed mb-6">{description}</p>
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-center gap-3 text-sm font-semibold text-primary/80">
              <Icon name="check_circle" className="text-accent-gold" size="sm" fill />
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
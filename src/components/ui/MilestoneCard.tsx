import { cn } from "@/lib/utils/cn";

import { Badge } from "./Badge";
import { Card, CardContent } from "./Card";
import { Icon } from "./Icon";

interface MilestoneCardProps {
  year: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function MilestoneCard({
  year,
  title,
  description,
  icon,
  className,
}: MilestoneCardProps) {
  return (
    <Card
      hover
      className={cn(
        "group p-10 border border-primary/5 hover:border-accent-gold/30 h-full min-h-70",
        className,
      )}
    >
      <CardContent className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
          <Icon
            name={icon}
            className="text-accent-gold"
            size="lg"
            weight={500}
          />
        </div>

        <Badge variant="gold" className="mb-4">
          {year}
        </Badge>

        <h4 className="text-2xl font-bold mb-4 text-primary">{title}</h4>
        <p className="text-primary/60 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

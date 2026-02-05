import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skill } from "@/lib/data";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="h-full transition-all hover:border-primary/50 hover:bg-muted/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-medium leading-none tracking-tight">
            <Link 
              href={skill.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline decoration-primary underline-offset-4 flex items-center gap-2"
            >
              {skill.name}
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </Link>
          </CardTitle>
          <Badge variant="secondary" className="text-xs font-normal">
            {skill.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {skill.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

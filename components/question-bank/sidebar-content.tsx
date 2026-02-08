import { BookOpen, HelpCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarContentProps = {
  type: "hints" | "explanation" | "tips";
  content: string | string[];
}

export function SidebarContent({ type, content }: SidebarContentProps) {
  const isList = Array.isArray(content);

  const config = {
    hints: {
      icon: HelpCircle,
      title: "Hints",
      bgColor: "bg-background",
      borderColor: "border-border",
      iconColor: "text-accent-foreground",
      bulletBg: "bg-primary/10",
      bulletText: "text-muted-foreground",
    },
    explanation: {
      icon: BookOpen,
      title: "Explanation",
      bgColor: "bg-background",
      borderColor: "border-border",
      iconColor: "text-secondary-foreground",
      bulletBg: "bg-primary/10",
      bulletText: "text-muted-foreground",
    },
    tips: {
      icon: Lightbulb,
      title: "Pro Tips",
      bgColor: "bg-background",
      borderColor: "border-primary/20",
      iconColor: "text-primary",
      bulletBg: "bg-primary/20",
      bulletText: "text-primary",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className={cn(`h-full rounded-xl border p-6`, config.bgColor, config.borderColor)}>
      <div className={cn(`mb-4 flex items-center gap-2`, config.iconColor)}>
        <Icon className="h-5 w-5" />
        <h3 className="text-sm font-bold tracking-wider uppercase">{config.title}</h3>
      </div>

      {isList ? (
        <ul className="space-y-4">
          {content.map((pill, index) => (
            <li key={index} className="text-muted-foreground flex gap-3 text-sm leading-relaxed">
              <span
                className={cn(
                  `flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold`,
                  config.bulletBg,
                  config.bulletText
                )}
              >
                {index + 1}
              </span>
              <p className="text-sm leading-4">{pill}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
      )}
    </div>
  );
}

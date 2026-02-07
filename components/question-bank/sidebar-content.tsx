import { BookOpen, HelpCircle, Lightbulb } from "lucide-react";

interface SidebarContentProps {
  type: "hints" | "explanation" | "tips";
  content: string | string[];
}

export function SidebarContent({ type, content }: SidebarContentProps) {
  const isList = Array.isArray(content);

  const config = {
    hints: {
      icon: HelpCircle,
      title: "Hints",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      iconColor: "text-amber-500",
      bulletBg: "bg-amber-500/20",
      bulletText: "text-amber-500",
    },
    explanation: {
      icon: BookOpen,
      title: "Explanation",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-500",
      bulletBg: "bg-emerald-500/20",
      bulletText: "text-emerald-500",
    },
    tips: {
      icon: Lightbulb,
      title: "Pro Tips",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      iconColor: "text-primary",
      bulletBg: "bg-primary/20",
      bulletText: "text-primary",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className={`h-full rounded-xl border ${config.borderColor} ${config.bgColor} p-6`}>
      <div className={`mb-4 flex items-center gap-2 ${config.iconColor}`}>
        <Icon className="h-5 w-5" />
        <h3 className="text-sm font-bold tracking-wider uppercase">{config.title}</h3>
      </div>

      {isList ? (
        <ul className="space-y-4">
          {content.map((pill, index) => (
            <li key={index} className="text-muted-foreground flex gap-3 text-sm leading-relaxed">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${config.bulletBg} text-[10px] font-bold ${config.bulletText}`}
              >
                {index + 1}
              </span>
              {pill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
      )}
    </div>
  );
}

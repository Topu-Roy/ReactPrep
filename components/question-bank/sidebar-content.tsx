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
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-100",
      iconColor: "text-amber-600",
      darkBgColor: "dark:bg-amber-950/20",
      darkBorderColor: "dark:border-amber-900/50",
      darkIconColor: "dark:text-amber-400",
      bulletBg: "bg-amber-100",
      bulletText: "text-amber-600",
      darkBulletBg: "dark:bg-amber-900/50",
      darkBulletText: "dark:text-amber-400",
    },
    explanation: {
      icon: BookOpen,
      title: "Explanation",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-600",
      darkBgColor: "dark:bg-emerald-950/20",
      darkBorderColor: "dark:border-emerald-900/50",
      darkIconColor: "dark:text-emerald-400",
      bulletBg: "bg-emerald-100",
      bulletText: "text-emerald-600",
      darkBulletBg: "dark:bg-emerald-900/50",
      darkBulletText: "dark:text-emerald-400",
    },
    tips: {
      icon: Lightbulb,
      title: "Pro Tips",
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-100",
      iconColor: "text-blue-600",
      darkBgColor: "dark:bg-blue-950/20",
      darkBorderColor: "dark:border-blue-900/50",
      darkIconColor: "dark:text-blue-400",
      bulletBg: "bg-blue-100",
      bulletText: "text-blue-600",
      darkBulletBg: "dark:bg-blue-900/50",
      darkBulletText: "dark:text-blue-400",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div
      className={`h-full rounded-xl border ${config.borderColor} ${config.bgColor} p-6 ${config.darkBorderColor} ${config.darkBgColor}`}
    >
      <div className={`mb-4 flex items-center gap-2 ${config.iconColor} ${config.darkIconColor}`}>
        <Icon className="h-5 w-5" />
        <h3 className="text-sm font-bold tracking-wider uppercase">{config.title}</h3>
      </div>

      {isList ? (
        <ul className="space-y-4">
          {content.map((pill, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${config.bulletBg} text-[10px] font-bold ${config.bulletText} ${config.darkBulletBg} ${config.darkBulletText}`}
              >
                {index + 1}
              </span>
              {pill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{content}</p>
      )}
    </div>
  );
}

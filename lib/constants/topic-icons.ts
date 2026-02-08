import { Anchor, HelpCircle, Layout, Zap, type LucideIcon } from "lucide-react";

export const TOPIC_ICONS: Record<string, LucideIcon> = {
  "react-hooks": Anchor,
  "performance-optimization": Zap,
  "design-patterns": Layout,
};

export function getTopicIcon(slug: string): LucideIcon {
  return TOPIC_ICONS[slug] || HelpCircle;
}

"use client";

import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TOPICS } from "@/lib/data/question-bank";

export function QuestionBankHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getBreadcrumbName = (segment: string) => {
    // Check if it's a topic slug
    const topic = TOPICS.find((t) => t.slug === segment);
    if (topic) return topic.name;

    // Common static routes mapping
    const commonRoutes: Record<string, string> = {
      "question-bank": "Question Bank",
      topics: "Topics",
    };

    if (commonRoutes[segment]) return commonRoutes[segment];

    // Fallback: capitalize and replace dashes
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white/50 px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:border-gray-800 dark:bg-gray-950/50">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/topics">Question Bank</BreadcrumbLink>
            </BreadcrumbItem>
            {segments.map((segment, index) => {
              // Skip 'topics' if it's the first segment to avoid redundancy with "Question Bank"
              // typically "Question Bank" -> /topics.
              // If path is /topics, segments is ['topics'].
              // If path is /topics/react-hooks, segments is ['topics', 'react-hooks'].

              const isLast = index === segments.length - 1;
              const path = `/${segments.slice(0, index + 1).join("/")}`;
              const name = getBreadcrumbName(segment);

              // We treat "Question Bank" as the home for this layout, which points to /topics.
              // So if segment is 'topics', we might want to skip it or just show it if you want explicit hierarchy.
              // Let's hide 'topics' segment if strictly following "Question Bank" == "/topics"
              if (segment === "topics") return null;

              return (
                <div key={path} className="flex items-center gap-2">
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

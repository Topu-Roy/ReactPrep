"use client";

import { Suspense } from "react";
import {
  Atom,
  HelpCircle,
  icons,
  Layout,
  LifeBuoy,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import Link, { type LinkProps } from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { TOPICS } from "@/lib/data/question-bank";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "User Name",
    email: "user@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "All Topics",
      url: "/topics" as LinkProps<string>["href"],
      icon: Layout,
    },
    ...TOPICS.map((topic) => ({
      title: topic.name,
      url: `/topics/${topic.slug}` as LinkProps<string>["href"],
      icon: (icons as unknown as Record<string, LucideIcon>)[topic.icon] || HelpCircle,
    })),
  ],
  //TODO
  navSecondary: [
    {
      title: "Support",
      url: "/" as LinkProps<string>["href"],
      icon: LifeBuoy,
    },
    {
      title: "Settings",
      url: "/" as LinkProps<string>["href"],
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/" className="flex w-full items-center gap-2">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600">
                  <Atom className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-wider uppercase">
                    React Prep
                  </span>
                  <span className="truncate text-[10px] opacity-70">v1.2.4</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <NavMain items={data.navMain} />
        </Suspense>
        <SidebarSeparator />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

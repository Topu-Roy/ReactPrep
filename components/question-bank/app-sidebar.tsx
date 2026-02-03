"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TOPICS } from "@/lib/data/question-bank";
import { NavMain } from "./nav-main";
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
      url: "/topics",
      icon: Icons.Layout,
    },
    ...TOPICS.map((topic) => ({
      title: topic.name,
      url: `/topics/${topic.slug}`,
      icon: (Icons as unknown as Record<string, Icons.LucideIcon>)[topic.icon] || Icons.HelpCircle,
    })),
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href="/topics" className="flex w-full items-center gap-2">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600">
                  <Icons.Atom className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">React Prep</span>
                  <span className="truncate text-xs">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

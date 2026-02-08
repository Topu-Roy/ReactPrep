"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "../ui/skeleton";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: LinkProps<string>["href"];
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.url} className="flex w-full items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function SidebarSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* We render 5 placeholder items to fill the vertical space */}
          {[1, 2, 3, 4, 5].map((i) => (
            <SidebarMenuItem key={i}>
              <div className="flex w-full items-center gap-2 px-2 py-1.5">
                {/* Icon Placeholder */}
                <Skeleton className="h-4 w-4 shrink-0 rounded" />

                {/* Text Placeholder - Hidden when sidebar is collapsed to icon mode */}
                <Skeleton className="h-4 w-24 group-data-[collapsible=icon]:hidden" />
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

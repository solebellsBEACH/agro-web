'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { type NavGroup, type NavMainItem } from "@/navigation/sidebar/sidebar-items";

interface NavMainProps {
  readonly items: readonly NavGroup[];
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">Soon</span>
);

const NavItem = ({ item, isActive }: { item: NavMainItem; isActive: (url: string) => boolean }) => (
  <SidebarMenuItem key={item.title}>
    <SidebarMenuButton
      asChild
      aria-disabled={item.comingSoon}
      isActive={isActive(item.url)}
      tooltip={item.title}
    >
      <Link href={item.url} target={item.newTab ? "_blank" : undefined}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        {item.comingSoon && <IsComingSoon />}
        <ChevronRight className="ml-auto" />
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function NavMain({ items }: NavMainProps) {
  const path = usePathname();
  const { isMobile } = useSidebar();

  const isItemActive = (url: string) => path === url;

  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.id}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {group.items.map((item) => (
                <NavItem key={item.title} item={item} isActive={isItemActive} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

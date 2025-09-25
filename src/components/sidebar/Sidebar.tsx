"use client";

import { MainNav } from "@/components/sidebar/MainNav";
import { TeamSwitcher } from "@/components/sidebar/TeamSwitcher";
import { UserMenu } from "@/components/sidebar/UserMenu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/Sidebar";
import { getSidebarConfig, type SidebarConfig } from "@/lib/sidebar-config";

import type * as React from "react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role?: string;
  user?: {
    name: string;
    email: string;
  };
}

export function AppSidebar({ role = "client", user, ...props }: AppSidebarProps) {
  const config: SidebarConfig = getSidebarConfig(role, user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={config.teams} />
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={config.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={config.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

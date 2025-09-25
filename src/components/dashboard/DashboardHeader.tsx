"use client";

import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/Breadcrumb";
import { Separator } from "@/components/ui/Separator";
import { SidebarTrigger } from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ThemeSelector } from "@/components/ThemeSelector";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface DashboardHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  actions?: ReactNode;
  className?: string;
}

export function DashboardHeader({
  title,
  description,
  breadcrumbs = [],
  user,
  actions,
  className
}: DashboardHeaderProps) {
  return (
    <header className={cn(
      "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/20",
      className
    )}>
      <div className="flex items-center gap-2 px-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                  <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                    {item.isCurrentPage ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href || "#"}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <div className="flex items-center gap-2 px-4">
        {actions}
        
        {user && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-700/50">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</p>
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white border-0 text-xs">
                {user.role.toUpperCase()}
              </Badge>
            </div>
          </div>
        )}
        
        <ThemeSelector />
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/auth/signin';
          }}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

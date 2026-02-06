import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import Link from "next/link";

// 1. Static Data Definition
const sidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
          isActive: true,
        },
        {
          label: "Tasks",
          icon: ClipboardList,
          href: "/tasks"
        },
        {
          label: "Roadmap",
          icon: BarChart3,
          href: "/roadmap"
        },
      ],
    },
  ],
  footerGroup: {
    title: "Support",
    items: [
      { label: "Help Center", icon: HelpCircle, href: "/help" },
      { label: "Settings", icon: Settings, href: "/settings" },
    ],
  },
};

// 2. Sidebar Component
export const Sidebar1 = ({
  userRole,
  ...props
}: {
  userRole: string
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <Link href="/">
          <h2 className="text-lg font-bold tracking-tight">Skill Bridge</h2>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.href} className="flex items-center gap-3">
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarData.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
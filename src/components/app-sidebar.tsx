"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "History",
      url: "/history",
      icon: IconListDetails,
    },
  ],
};

interface MyJwtPayload {
  userId: string;
  username: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.warn("Token not found in cookie");
      return;
    }

    try {
      const decodedToken = jwtDecode<MyJwtPayload>(token);
      setName(decodedToken.username);
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }, []);

  if (path.startsWith("/auth")) {
    return null;
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">MBraking</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={name} />
      </SidebarFooter>
    </Sidebar>
  );
}

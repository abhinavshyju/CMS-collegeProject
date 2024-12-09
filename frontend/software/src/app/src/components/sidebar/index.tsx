import { Home, Settings, User, ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

export function MainSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {state === "expanded" ? (
          <div className=" pl-4 py-2 w-full border-b pb-2">
            <h1 className="text-3xl font-bold font-mono">CMS</h1>
            <h1 className="font-mono text-xs">By something</h1>
          </div>
        ) : (
          <div className="px-2 py-2 w-full border-b pb-2">
            <h1 className="text-3xl font-bold font-mono">C</h1>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          <SidebarMenuItem className="">
            <SidebarMenuButton asChild tooltip="Home">
              <a href="/">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <Collapsible>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Profile">
                  <User className="h-4 w-4" />
                  <span>Students</span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/add-students">Add Students</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/view-students">View Students</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <a href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* <p className="text-xs text-gray-500 px-4 py-2">
          {state === "expanded" ? "© 2024 My App" : "© 2024"}
        </p> */}
      </SidebarFooter>
    </Sidebar>
  );
}

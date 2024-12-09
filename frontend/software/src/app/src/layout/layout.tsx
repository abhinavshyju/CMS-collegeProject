import { MainSidebar } from "@/components/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <MainSidebar />
        <SidebarInset>
          <header className="flex h-16 items-center gap-4 border-b px-6 py-6 w-full">
            <SidebarTrigger />
            <h1 className="font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-6 w-full">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
      <SidebarRail />
    </SidebarProvider>
  );
};

export default Layout;

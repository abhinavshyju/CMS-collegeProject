import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  ClipboardList,
  Settings,
  BarChart,
} from "lucide-react";

const sidebarItems = [
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: GraduationCap, label: "Students", href: "/students" },
  { icon: Users, label: "Faculty", href: "/dashboard/faculty" },
  { icon: Users, label: "Staff", href: "/dashboard/staff" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: ClipboardList, label: "Grades", href: "/grades" },
  { icon: BarChart, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 bottom-0 z-40 hidden w-64 border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <a className="flex items-center gap-2 font-semibold" href="#">
            <GraduationCap className="h-6 w-6" />
            <span className="">College Management</span>
          </a>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-2 py-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  "hover:bg-gray-200 dark:hover:bg-gray-700",
                  "focus:bg-gray-200 dark:focus:bg-gray-700"
                )}
                asChild
              >
                <a href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

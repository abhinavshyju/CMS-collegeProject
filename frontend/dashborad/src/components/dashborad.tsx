import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, Calendar } from "lucide-react";

const stats = [
  {
    title: "Total Courses",
    value: "24",
    icon: BookOpen,
    description: "Across all departments",
  },
  {
    title: "Enrolled Students",
    value: "1,234",
    icon: GraduationCap,
    description: "Current semester",
  },
  {
    title: "Faculty Members",
    value: "78",
    icon: Users,
    description: "Full-time and part-time",
  },
  {
    title: "Upcoming Events",
    value: "12",
    icon: Calendar,
    description: "Next 30 days",
  },
];

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

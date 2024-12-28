import { Courses } from "@/components/courses";
import { Dashboard } from "@/components/dashborad";
import { Faculty } from "@/components/faculty";
import { Layout } from "@/components/layout";
import { Schedule } from "@/components/schedule";
import { Staff } from "@/components/staff";

export default function MainPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">College Management Dashboard</h1>
        <Dashboard />
        <div className="grid gap-6 md:grid-cols-2">
          <Courses />
          <Staff />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Faculty />
          <Schedule />
        </div>
      </div>
    </Layout>
  );
}

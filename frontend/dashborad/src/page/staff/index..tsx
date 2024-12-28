import { StaffAddDialog } from "./add-staff-dialog";
import { Staff } from "@/components/staff";

const StaffPage = () => {
  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold">Faculties</h1>
      <StaffAddDialog />
      <Staff />
    </div>
  );
};

export default StaffPage;

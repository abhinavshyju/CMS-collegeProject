import FacultyRole from "./faculty-role";
import StaffRole from "./staff-role";

export default function UtilPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full space-y-4 rounded-lg border p-4 shadow">
        <h1 className="text-xl font-semibold">Staff Role</h1>
        <StaffRole />
      </div>

      <div className="w-full space-y-4 rounded-lg border p-4 shadow">
        <h1 className="text-xl font-semibold">Faculty Role</h1>
        <FacultyRole />
      </div>
    </div>
  );
}

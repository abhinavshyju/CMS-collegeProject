import AddDepartment from "./add-department";
import ViewDepartment from "./view-department";

export default function DepartmentPage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <AddDepartment />
      </div>
      <ViewDepartment />
    </div>
  );
}

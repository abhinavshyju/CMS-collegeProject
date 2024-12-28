import { Faculty } from "@/components/faculty";
import { FacultyAddDialog } from "./add-fuculty-dialog";

const FacultyPage = () => {
  return (
    <div className="max-w-7xl">
      <h1 className="text-3xl font-bold">Faculties</h1>
      <FacultyAddDialog />
      <Faculty />
    </div>
  );
};

export default FacultyPage;

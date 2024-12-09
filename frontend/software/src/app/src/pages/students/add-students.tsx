import { AdmissionForm } from "@/components/form/admisson-form";
import { Card } from "@/components/ui/card";

const AddStudents = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add Students</h1>
      <p className="text-sm text-gray-500">
        Add students to the system, and manage their information.
      </p>

      <AdmissionForm />
    </div>
  );
};

export default AddStudents;

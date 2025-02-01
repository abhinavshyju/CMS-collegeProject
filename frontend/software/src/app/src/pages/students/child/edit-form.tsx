import { EditAdmissionForm } from "@/components/form/edit-admission-form";
import { useParams } from "react-router-dom";

export default function EditForm() {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <EditAdmissionForm AdmissionNumber={id!} />
    </div>
  );
}

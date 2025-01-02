import AddClass from "./add-class";
import ViewClass from "./view-class";

export default function ClassPage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <AddClass />
      </div>
      <ViewClass />
    </div>
  );
}

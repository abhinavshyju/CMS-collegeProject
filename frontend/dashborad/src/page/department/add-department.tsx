import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { URL } from "@/static";

export default function AddDepartment() {
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const department = e.currentTarget.department.value;
    const url = URL + "/util/create-department";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: department }),
    });
    if (response.ok) {
      toast({
        title: "Success",
        description: "Department added successfully",
        variant: "default",
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Department</Button>
        </DialogTrigger>
        <DialogContent>
          <p>Add Department</p>
          <form onSubmit={formSubmit} className="space-y-2">
            <Input
              type="text"
              placeholder="Department Name"
              name="department"
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

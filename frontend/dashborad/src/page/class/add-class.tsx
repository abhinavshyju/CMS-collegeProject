import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { URL } from "@/static";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
interface DepartmentType {
  id: number;
  department: string;
}
export default function AddClass() {
  const [department, setDepartment] = useState<DepartmentType[]>([]);
  useEffect(() => {
    return () => {
      const url = URL + "/util/department";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setDepartment(data.data));
    };
  }, []);

  const [disenable, setDisenable] = useState(false);
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const className = e.currentTarget.class.value;
    const departmentId = e.currentTarget.department.value;
    console.log(className, departmentId);
    const url = URL + "/util/create-class";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: className, department_id: departmentId }),
    });
    if (response.ok) {
      toast({
        title: "Success",
        description: "Class added successfully",
        variant: "default",
      });
      setDisenable(true);
      setTimeout(() => {
        setDisenable(false);
        location.reload();
      }, 3000);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Class</Button>
        </DialogTrigger>
        <DialogContent>
          <p>Add class</p>
          <form onSubmit={formSubmit} className="space-y-2">
            <Input type="text" placeholder="Class Name" name="class" />
            <Select name="department">
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  {department.length > 0 &&
                    department.map((d) => (
                      <SelectItem value={`${d.id}`}>{d.department}</SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit" disabled={disenable}>
              {disenable && <Loader className="animate-spin" />}
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

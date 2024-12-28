import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
interface Faculty {
  name: string;
  email: string;
  password: string;
  department: string;
  role: string;
}

export function FacultyAddDialog() {
  const [faculty, setfaculty] = useState<Faculty>({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "",
  });
  const onSubmit = async () => {
    if (
      faculty.name && 
      faculty.email &&
      faculty.password &&
      faculty.department &&
      faculty.role
    ) {
      await fetch("http://localhost:3000/admin/add-faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faculty),
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Faculty</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Faculty</DialogTitle>
          <DialogDescription>Add new faculty member</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => {
                setfaculty({ ...faculty, name: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={(e) => {
                setfaculty({ ...faculty, email: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Password" className="text-right">
              Password
            </Label>
            <Input
              id="Password"
              className="col-span-3"
              onChange={(e) => {
                setfaculty({ ...faculty, password: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Department
            </Label>
            <Select
              onValueChange={(e) => setfaculty({ ...faculty, department: e })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  <SelectItem value="computer">Computer</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="commerce">commerce</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Role
            </Label>
            <Select onValueChange={(e) => setfaculty({ ...faculty, role: e })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  <SelectItem value="hod">HOD</SelectItem>
                  <SelectItem value="teacher">teacher</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Add faculty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

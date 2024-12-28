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
interface Staff {
  name: string;
  email: string;
  password: string;
  role: string;
}

export function StaffAddDialog() {
  const [staff, setstaff] = useState<Staff>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const onSubmit = async () => {
    if (staff.name && staff.email && staff.password && staff.role) {
      const res = await fetch("http://localhost:3000/admin/add-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
      });
      if (res.ok) {
        window.location.reload();
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Staff</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New staff</DialogTitle>
          <DialogDescription>Add new staff member</DialogDescription>
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
                setstaff({ ...staff, name: e.target.value });
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
                setstaff({ ...staff, email: e.target.value });
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
                setstaff({ ...staff, password: e.target.value });
              }}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select onValueChange={(e) => setstaff({ ...staff, role: e })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Add staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

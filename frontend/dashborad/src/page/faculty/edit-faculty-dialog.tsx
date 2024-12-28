import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { URL } from "@/static";
import { useState } from "react";
interface Faculty {
  id: string;
  name: string;
  email: string;
  active: boolean;
  role: string;
}

export function FacultyEditDialog(prop: Faculty) {
  const [faculty, setfaculty] = useState<Faculty>({
    ...prop,
  });
  const onSubmit = async () => {
    const url = URL + "/faculty/" + faculty.id;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faculty),
    });
    if (res.ok) {
      window.location.reload();
    }
    console.log(res);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit faculty</DialogTitle>
          <DialogDescription>Edit faculty member</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={faculty.name}
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
              value={faculty.email}
              className="col-span-3"
              onChange={(e) => {
                setfaculty({ ...faculty, email: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Checkbox
              defaultChecked={faculty.active}
              onCheckedChange={(e) =>
                setfaculty({ ...faculty, active: e as boolean })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              onValueChange={(e) => setfaculty({ ...faculty, role: e })}
              value={faculty.role}
            >
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
            Edit faculty
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

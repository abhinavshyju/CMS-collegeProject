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
interface Staff {
  id: string;
  name: string;
  email: string;
  active: boolean;
  role: string;
}

export function StaffEditDialog(prop: Staff) {
  const [staff, setstaff] = useState<Staff>({
    ...prop,
  });
  const onSubmit = async () => {
    const url = URL + "/staff/" + staff.id;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staff),
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
          <DialogTitle>Edit staff</DialogTitle>
          <DialogDescription>Edit staff member</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={staff.name}
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
              value={staff.email}
              className="col-span-3"
              onChange={(e) => {
                setstaff({ ...staff, email: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Active
            </Label>
            <Checkbox
              defaultChecked={staff.active}
              onCheckedChange={(e) =>
                setstaff({ ...staff, active: e as boolean })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              onValueChange={(e) => setstaff({ ...staff, role: e })}
              value={staff.role}
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
            Edit staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState, useEffect } from "react";
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
import { URL } from "@/static";
import { toast } from "@/hooks/use-toast";
interface Staff {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

export interface RoleType {
  id: number;
  role: string;
}

export function StaffAddDialog() {
  const [staff, setStaff] = useState<Staff>({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${URL}/util/staff-role`);
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        const data = await response.json();
        setRoles(data.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast({
          title: "Error",
          description: "Failed to fetch roles. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async () => {
    if (staff.name && staff.email && staff.password && staff.role_id) {
      setIsLoading(true);
      try {
        const res = await fetch(`${URL}/staff`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(staff),
        });
        if (!res.ok) {
          throw new Error("Failed to add staff");
        }
        toast({
          title: "Success",
          description: "Staff member added successfully.",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error adding staff:", error);
        toast({
          title: "Error",
          description: "Failed to add staff. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Staff</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
          <DialogDescription>
            Add a new staff member to the system
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setStaff({ ...staff, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
              onChange={(e) => setStaff({ ...staff, password: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select onValueChange={(e) => setStaff({ ...staff, role_id: e })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={`${role.id}`}>
                      {role.role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Staff"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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

import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { URL } from "@/static";

interface Faculty {
  name: string;
  email: string;
  password: string;
  department_id: number | null;
  role_id: number | null;
}

interface RoleType {
  id: number;
  role: string;
}

interface DepartmentType {
  id: number;
  department: string;
}

export function FacultyAddDialog() {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [faculty, setFaculty] = useState<Faculty>({
    name: "",
    email: "",
    password: "",
    department_id: null,
    role_id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesResponse, departmentsResponse] = await Promise.all([
          fetch(`${URL}/util/faculty-role`),
          fetch(`${URL}/util/department`),
        ]);

        if (!rolesResponse.ok || !departmentsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const rolesData = await rolesResponse.json();
        const departmentsData = await departmentsResponse.json();

        setRoles(rolesData.data);
        setDepartments(departmentsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description:
            "Failed to load roles and departments. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    return (
      faculty.name.trim() !== "" &&
      faculty.email.trim() !== "" &&
      faculty.password.trim() !== "" &&
      faculty.department_id !== null &&
      faculty.role_id !== null
    );
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/faculty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faculty),
      });

      if (!response.ok) {
        throw new Error("Failed to add faculty");
      }

      toast({
        title: "Success",
        description: "Faculty member added successfully.",
      });
      setOpen(false);
      setFaculty({
        name: "",
        email: "",
        password: "",
        department_id: null,
        role_id: null,
      });
    } catch (error) {
      console.error("Error adding faculty:", error);
      toast({
        title: "Error",
        description: "Failed to add faculty member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Faculty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Faculty</DialogTitle>
          <DialogDescription>
            Add a new faculty member to the system
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={faculty.name}
              onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={faculty.email}
              onChange={(e) =>
                setFaculty({ ...faculty, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={faculty.password}
              onChange={(e) =>
                setFaculty({ ...faculty, password: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={faculty.department_id?.toString()}
              onValueChange={(e) =>
                setFaculty({ ...faculty, department_id: Number(e) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  {departments.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.department}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={faculty.role_id?.toString()}
              onValueChange={(e) =>
                setFaculty({ ...faculty, role_id: Number(e) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {roles.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Adding..." : "Add Faculty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { FacultyEditDialog } from "@/page/faculty/edit-faculty-dialog";

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: boolean;
}
export function Faculty() {
  const [value, setvalue] = useState<Faculty[]>();
  const fetchData = async () => {
    const respones = await fetch("http://localhost:3000/admin/faculty");
    const data = await respones.json();
    setvalue(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(value);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty</CardTitle>
        <CardDescription>A list of all faculty members.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Faculty ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value &&
              value.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {member.name}
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <FacultyEditDialog active={member.status} {...member} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

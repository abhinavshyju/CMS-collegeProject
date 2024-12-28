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
import { URL } from "@/static";
import { StaffEditDialog } from "@/page/staff/edit-staff-dialog";

interface Staff {
  id: string;
  name: string;
  department: string;
  email: string;
  role: string;
  status: boolean;
}
export function Staff() {
  const [value, setvalue] = useState<Staff[]>();

  const fetchData = async () => {
    const url = URL + "/staff";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setvalue(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(value);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff</CardTitle>
        <CardDescription>A list of all Staff members.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <StaffEditDialog active={member.status} {...member} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

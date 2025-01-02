import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { URL } from "@/static";
import { useEffect, useState } from "react";
interface DepartmentType {
  id: number;
  department: string;
}
export default function ViewDepartment() {
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
  console.log(department);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Department Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {department.length > 0 &&
            department.map((item, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  course: string;
  verified: boolean;
}

const studentsData: Student[] = [
  {
    id: "1",
    admissionNo: "A001",
    name: "John Doe",
    course: "Computer Science",
    verified: false,
  },
  {
    id: "2",
    admissionNo: "A002",
    name: "Jane Smith",
    course: "Engineering",
    verified: false,
  },
  {
    id: "3",
    admissionNo: "A003",
    name: "Bob Johnson",
    course: "Mathematics",
    verified: true,
  },
  {
    id: "4",
    admissionNo: "A004",
    name: "Alice Williams",
    course: "Physics",
    verified: false,
  },
  {
    id: "5",
    admissionNo: "A005",
    name: "Charlie Brown",
    course: "Chemistry",
    verified: true,
  },
];

export default function AcceptStudentTable() {
  const [students, setStudents] = useState<Student[]>(studentsData);

  const handleVerify = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, verified: true } : student
      )
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Admission No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.admissionNo}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.course}</TableCell>
            <TableCell>
              {student.verified ? (
                <span className="text-green-600 font-medium">Verified</span>
              ) : (
                <Button onClick={() => handleVerify(student.id)}>Verify</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

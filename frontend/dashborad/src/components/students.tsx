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

const students = [
  { id: "1001", name: "Alice Johnson", major: "Computer Science", gpa: 3.8 },
  { id: "1002", name: "Bob Smith", major: "Mathematics", gpa: 3.6 },
  { id: "1003", name: "Charlie Brown", major: "Physics", gpa: 3.9 },
  { id: "1004", name: "Diana Miller", major: "English", gpa: 3.7 },
];

export function Students() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff</CardTitle>
        <CardDescription>A list of all enrolled students.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>GPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${student.name}`}
                      alt={student.name}
                    />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {student.name}
                </TableCell>
                <TableCell>{student.major}</TableCell>
                <TableCell>{student.gpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

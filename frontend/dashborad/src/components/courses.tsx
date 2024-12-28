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

const courses = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Smith",
    students: 120,
  },
  {
    id: "MATH201",
    name: "Advanced Calculus",
    instructor: "Prof. Johnson",
    students: 80,
  },
  {
    id: "ENG102",
    name: "English Composition",
    instructor: "Ms. Davis",
    students: 90,
  },
  {
    id: "PHYS301",
    name: "Quantum Mechanics",
    instructor: "Dr. Brown",
    students: 60,
  },
];

export function Courses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>
          A list of all courses offered this semester.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course ID</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Students Enrolled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.students}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

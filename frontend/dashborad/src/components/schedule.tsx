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

const schedule = [
  {
    id: 1,
    course: "CS101",
    time: "09:00 AM - 10:30 AM",
    days: "Mon, Wed, Fri",
    room: "Room 101",
  },
  {
    id: 2,
    course: "MATH201",
    time: "11:00 AM - 12:30 PM",
    days: "Tue, Thu",
    room: "Room 205",
  },
  {
    id: 3,
    course: "ENG102",
    time: "02:00 PM - 03:30 PM",
    days: "Mon, Wed",
    room: "Room 303",
  },
  {
    id: 4,
    course: "PHYS301",
    time: "04:00 PM - 05:30 PM",
    days: "Tue, Thu",
    room: "Lab 2",
  },
];

export function Schedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Schedule</CardTitle>
        <CardDescription>Current semester class schedule.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.days}</TableCell>
                <TableCell>{item.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

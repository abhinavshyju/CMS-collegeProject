import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { SemesterForm } from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface SemesterType {
  id: string;
  semesterId: string;
  endDate: string;
  startDate: string;
}
export default function Semester() {
  const [semester, setsemester] = useState<SemesterType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:3000/semester/getSemesterT",
        {
          method: "GET",
        },
      );
      if (response.ok) {
        const data = await response.json();
        setsemester(data.data);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add</Button>
        </DialogTrigger>
        <DialogContent className="min-w-[600px]">
          <ScrollArea className="max-h-screen py-6">
            <SemesterForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">No</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {semester.map((sem) => (
            <TableRow>
              <TableCell>{sem.id}</TableCell>
              <TableCell>{sem.semesterId}</TableCell>
              <TableCell>{sem.startDate}</TableCell>
              <TableCell>{sem.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

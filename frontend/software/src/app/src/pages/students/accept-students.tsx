"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetRequest } from "@/services/request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Student {
  id: string;
  admissionNumber: string;
  name: string;
}

export default function AcceptStudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await GetRequest("staff/students-accept");
      if (response.status === 200) {
        const data = await response.json();
        setStudents(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Student Admissions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Admission No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.admissionNumber}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" asChild>
                        <Link to={`${student.admissionNumber}`}>
                          Open <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

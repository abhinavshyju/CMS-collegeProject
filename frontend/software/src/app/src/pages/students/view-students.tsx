import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GetRequest } from "@/services/request";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { array } from "zod";

interface studentType {
  admissionNumber: string;
  name: string;
  class: string;
  contact: string;
}

const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<studentType[]>([]);
  const fetchStudents = async () => {
    const response = await GetRequest("staff/student");
    if (response.status === 200) {
      const Data = await response.json();
      setStudents(Data.data);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  console.log(students);
  //   const [page, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="shadow rounded-md p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Admission Number</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.admissionNumber}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.contact}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/dashboard/view-students/${student.admissionNumber}`
                    )
                  }
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
            />
          </PaginationItem>
          {totalPages > 0 &&
            Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
              <PaginationItem key={`page-${i}`}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          {totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ViewStudents;

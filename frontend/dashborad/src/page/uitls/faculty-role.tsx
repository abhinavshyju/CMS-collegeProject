import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { URL } from "@/static";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface facultyRoleProps {
  id: number;
  role: string;
}
export default function FacultyRole() {
  const [trigger, setTrigger] = useState(false);
  const triggerFun = () => {
    setTrigger(!trigger);
  };

  const [facultyRoles, setfacultyRoles] = useState<facultyRoleProps[]>([]);

  useEffect(() => {
    return () => {
      const url = URL + "/util/faculty-role";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setfacultyRoles(data.data));
    };
  }, [trigger]);
  return (
    <div>
      <div className="flex justify-end">
        <Createfaculty fun={triggerFun} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Role </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facultyRoles.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface CreatefacultyProps {
  fun: () => void;
}
const Createfaculty = ({ fun }: CreatefacultyProps) => {
  const roleSchema = z.object({
    role: z.string().min(3, "Role must be at least 3 characters long"),
  });

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
  });
  const onSubmit = async (value: z.infer<typeof roleSchema>) => {
    const url = URL + "/util/create-faculty-role";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ role: value.role }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fun();
    if (response.ok) {
      toast({
        title: "Success",
        description: "faculty role created successfully",
      });
    }
  };
  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          <Button>Create role</Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role title</FormLabel>
                    <FormControl>
                      <Input placeholder="Role title " {...field} />
                    </FormControl>
                    <FormDescription>
                      This the role title of the faculty.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

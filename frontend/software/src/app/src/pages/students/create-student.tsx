import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetRequest, PostRequest } from "@/services/request";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  admissionNumber: z.string().min(2, {
    message: "Please enter a valid admission number.",
  }),
  admissionYear: z.string().min(2, {
    message: "Select aa valid admission date.",
  }),
  courseName: z.string().min(2, {
    message: "Course name must be at least 2 characters.",
  }),
});
interface ClassType {
  id: number;
  class: string;
}

export default function CreateStudent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      courseName: "",
    },
  });
  const [clsses, setClsses] = useState<ClassType[]>([]);
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await GetRequest("admin/util/class");
      if (response.ok) {
        const data = await response.json();
        setClsses(data.data);
      }
    };
    fetchClasses();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await PostRequest("staff/create-student", values);
      if (response.status === 201) {
        toast({
          title: "Student created",
          description: "The student has been successfully added to the course.",
        });
        form.reset();
      } else {
        toast({ title: "Something went wrong." });
      }
    } catch (error) {
      toast({ title: "Something went wrong. Please try again later." });
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Enter the student's full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter the student's email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admissionNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admission number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>
                Enter the student's admission number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admissionYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admission Date</FormLabel>
              <FormControl>
                <Input type="month" placeholder="**********" {...field} />
              </FormControl>
              <FormDescription>
                Select the student's admission date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clsses.map((course) => (
                    <SelectItem key={course.class} value={course.class}>
                      {course.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the course the student is enrolling in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Student</Button>
      </form>
    </Form>
  );
}

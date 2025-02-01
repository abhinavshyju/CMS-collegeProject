import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { admissionFormSchema, AdmissionFormValues } from "@/lib/shema";
import { GetRequest, PostRequest } from "@/services/request";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

interface ClassType {
  id: number;
  class: string;
}

export function EditAdmissionForm({
  AdmissionNumber,
}: {
  AdmissionNumber: string;
}) {
  const [initialValues, setInitialValue] = useState<AdmissionFormValues>();
  const [classes, setClasses] = useState<ClassType[]>([]);

  const getData = async () => {
    try {
      const response = await GetRequest(
        `staff/students-accept/${AdmissionNumber}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setInitialValue(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await GetRequest("admin/util/class");
      if (response.ok) {
        const data = await response.json();
        setClasses(data.data);
      }
    };
    fetchClasses();
  }, []);

  async function onSubmit(values: AdmissionFormValues) {
    try {
      const response = await PostRequest(
        `staff/student-update/${AdmissionNumber}`,
        values
      );
      if (response.status === 201 || response.status === 200) {
        toast.success(
          initialValues
            ? "Student information updated successfully"
            : "Student added successfully",
          {
            position: "bottom-right",
          }
        );
        form.reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <ToastContainer />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Student Admission Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="guardian">Guardian</TabsTrigger>
                <TabsTrigger value="university">University</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="admissionNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter admission number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="admissionYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Year</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter admission year"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="_class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.class}>
                                {cls.class}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="contact" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contact.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="guardian" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="guardianinfo.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter guardian name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardianinfo.mother"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mother's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mother's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardianinfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter guardian phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardianinfo.annualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter annual income" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="university" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="universitydetails.capId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CAP ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter CAP ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="universitydetails.docNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter document number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="universitydetails.nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nationality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="universitydetails.nativity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nativity</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nativity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="universitydetails.religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter religion" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="additional" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="additionalinformation.exServiceman"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ex-Serviceman
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalinformation.disabilityStatus"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Disability Status
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalinformation.nssVolunteer"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          NSS Volunteer
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalinformation.aGradeInSite"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          A Grade in SITE
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalinformation.ihrdTssQuota"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          IHRD TSS Quota
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">
            Accept
          </Button>
        </div>
      </form>
    </Form>
  );
}

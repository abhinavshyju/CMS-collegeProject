"use client";

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
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { admissionFormSchema, AdmissionFormValues } from "@/lib/shema";
import { PostRequest } from "@/services/request";
import { toast, ToastContainer } from "react-toastify";

export function AdmissionForm() {
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
      additionalinformation: {
        exServiceman: false,
        disabilityStatus: false,
        nssVolunteer: false,
        aGradeInSite: false,
        ihrdTssQuota: false,
      },
    },
  });

  async function onSubmit(values: AdmissionFormValues) {
    try {
      const response = await PostRequest("staff/add-student", values);
      console.log(response);
      if (response.status === 201) {
        toast.success("Student added successfully", {
          position: "bottom-right",
        });
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
        className="space-y-8 grid grid-cols-[300px_1fr] gap-4 max-w-screen-lg border rounded-lg  pb-4 "
      >
        <CardHeader>
          <CardTitle className="text-xl ">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="admissionNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admission Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter admission number" {...field} />
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
                      <SelectValue placeholder="Select gender" />
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
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl ">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                  <Input type="email" placeholder="Enter email" {...field} />
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
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl ">Guardian Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                  <Input placeholder="Enter guardian phone number" {...field} />
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
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl ">University Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                  <Input placeholder="Enter document number" {...field} />
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
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl ">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="additionalinformation.exServiceman"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Ex-Serviceman</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalinformation.disabilityStatus"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Disability Status</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalinformation.nssVolunteer"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>NSS Volunteer</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalinformation.aGradeInSite"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>A Grade in SITE</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalinformation.ihrdTssQuota"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>IHRD TSS Quota</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl ">Class Information</CardTitle>
        </CardHeader>
        <CardContent>
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
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bsc">Bsc</SelectItem>
                    <SelectItem value="msc">Msc</SelectItem>
                    <SelectItem value="btech">Btech</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl ">Parent Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="parent.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter parent name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter parent email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter parent phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <div className="flex justify-end col-span-full pr-4">
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </Form>
  );
}

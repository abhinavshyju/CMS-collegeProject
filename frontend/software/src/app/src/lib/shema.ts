import * as z from "zod";

export const admissionFormSchema = z.object({
  admissionNumber: z.string().min(1, "Admission number is required"),
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contact: z.object({
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
  guardianinfo: z.object({
    name: z.string().min(1, "Guardian name is required"),
    mother: z.string().min(1, "Mother's name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    annualIncome: z.string().min(1, "Annual income is required"),
  }),
  universitydetails: z.object({
    capId: z.string().min(1, "CAP ID is required"),
    docNo: z.string().min(1, "Document number is required"),
    nationality: z.string().min(1, "Nationality is required"),
    nativity: z.string().min(1, "Nativity is required"),
    religion: z.string().min(1, "Religion is required"),
  }),
  additionalinformation: z.object({
    exServiceman: z.boolean(),
    disabilityStatus: z.boolean(),
    nssVolunteer: z.boolean(),
    aGradeInSite: z.boolean(),
    ihrdTssQuota: z.boolean(),
  }),
  _class: z.string().min(1, "Class is required"),
  parent: z.object({
    name: z.string().min(1, "Parent name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
});

export type AdmissionFormValues = z.infer<typeof admissionFormSchema>;

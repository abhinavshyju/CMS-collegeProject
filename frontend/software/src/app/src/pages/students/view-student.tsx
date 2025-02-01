"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GetRequest } from "@/services/request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

interface StudentData {
  id: number;
  name: string | null;
  gender: string | null;
  dob: string | null;
  admissionNo: string | null;
  admissionYear: string | null;
  status: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  class_id: number | null;
  contact_id: number | null;
  guardian_info_id: number | null;
  university_details_id: number | null;
  additional_info_id: number | null;
  contact: {
    id: number | null;
    address: string | null;
    email: string | null;
    phone: string | null;
    studentId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    student_id: number | null;
  } | null;
  guardianInfo: {
    id: number | null;
    name: string | null;
    mottherName: string | null;
    phone: string | null;
    annualIncome: number | null;
    studentId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    student_id: number | null;
  } | null;
  universityDetail: {
    id: number | null;
    capId: string | null;
    docNo: string | null;
    nationality: string | null;
    navity: string | null;
    religion: string | null;
    regNo: string | null;
    studentId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    student_id: number | null;
  } | null;
  additionalInfo: {
    id: number | null;
    exService: boolean | null;
    disability: boolean | null;
    nssVol: boolean | null;
    aGrade: boolean | null;
    ihrdtss: boolean | null;
    studentId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    student_id: number | null;
  } | null;
  class: {
    id: number | null;
    class: string | null;
    departmentId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    department_id: number | null;
    student_form_id: null;
    department: {
      id: number | null;
      department: string | null;
      createdAt: string | null;
      updatedAt: string | null;
    } | null;
  } | null;
}

export default function StudentDetailsDisplay() {
  const params = useParams();
  const admissionNumber = params.id;
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetRequest(`staff/student/${admissionNumber}`);
        if (response.status === 200) {
          const Data = await response.json();
          setStudent(Data.data);
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [admissionNumber]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!student) {
    return (
      <div className="text-center text-red-500">
        Failed to load student data.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Student Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <PersonalInfoCard student={student} />
        <AdmissionDetailsCard student={student} />
        <ContactInfoCard student={student} />
        <GuardianInfoCard student={student} />
        <UniversityDetailsCard student={student} />
        <AdditionalInfoCard student={student} />
      </div>
    </div>
  );
}

function PersonalInfoCard({ student }: { student: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Personal Information
          <Badge variant={student.status ? "success" : "destructive"}>
            {student.status ? "Active" : "Inactive"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InfoItem label="Name" value={student.name} />
        <InfoItem label="Gender" value={student.gender} capitalize />
        <InfoItem
          label="Date of Birth"
          value={
            student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"
          }
        />
      </CardContent>
    </Card>
  );
}

function AdmissionDetailsCard({ student }: { student: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admission Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InfoItem label="Admission Number" value={student.admissionNo} />
        <InfoItem
          label="Admission Year"
          value={
            student.admissionYear
              ? new Date(student.admissionYear).getFullYear().toString()
              : "N/A"
          }
        />
        <InfoItem label="Class" value={student.class?.class} />
        <InfoItem
          label="Department"
          value={student.class?.department?.department}
        />
      </CardContent>
    </Card>
  );
}

function ContactInfoCard({ student }: { student: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InfoItem label="Address" value={student.contact?.address} />
        <InfoItem label="Email" value={student.contact?.email} />
        <InfoItem label="Phone" value={student.contact?.phone} />
      </CardContent>
    </Card>
  );
}

function GuardianInfoCard({ student }: { student: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guardian Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InfoItem label="Guardian Name" value={student.guardianInfo?.name} />
        <InfoItem
          label="Mother's Name"
          value={student.guardianInfo?.mottherName}
        />
        <InfoItem
          label="Guardian's Phone"
          value={student.guardianInfo?.phone}
        />
        <InfoItem
          label="Annual Income"
          value={student.guardianInfo?.annualIncome?.toString()}
        />
      </CardContent>
    </Card>
  );
}

function UniversityDetailsCard({ student }: { student: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>University Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InfoItem label="CAP ID" value={student.universityDetail?.capId} />
        <InfoItem
          label="Document Number"
          value={student.universityDetail?.docNo}
        />
        <InfoItem
          label="Nationality"
          value={student.universityDetail?.nationality}
        />
        <InfoItem label="Nativity" value={student.universityDetail?.navity} />
        <InfoItem label="Religion" value={student.universityDetail?.religion} />
        <InfoItem
          label="Registration Number"
          value={student.universityDetail?.regNo}
        />
      </CardContent>
    </Card>
  );
}

function AdditionalInfoCard({ student }: { student: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SwitchItem
          label="Ex-Serviceman"
          checked={!!student.additionalInfo?.exService}
        />
        <SwitchItem
          label="Disability Status"
          checked={!!student.additionalInfo?.disability}
        />
        <SwitchItem
          label="NSS Volunteer"
          checked={!!student.additionalInfo?.nssVol}
        />
        <SwitchItem
          label="A Grade"
          checked={!!student.additionalInfo?.aGrade}
        />
        <SwitchItem
          label="IHRD TSS Quota"
          checked={!!student.additionalInfo?.ihrdtss}
        />
      </CardContent>
    </Card>
  );
}

function InfoItem({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string | null | undefined;
  capitalize?: boolean;
}) {
  return (
    <div>
      <Label className="font-semibold">{label}</Label>
      <p className={capitalize ? "capitalize" : ""}>{value || "N/A"}</p>
    </div>
  );
}

function SwitchItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch checked={checked} disabled />
      <Label>{label}</Label>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Skeleton className="h-10 w-64 mx-auto mb-8" />
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, j) => (
                <div key={j}>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

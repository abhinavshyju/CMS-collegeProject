import { Button } from "@/components/ui/button";
import { GetRequest } from "@/services/request";
import { School } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function PrintPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const params = useParams();
  const id = params.id;
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
  const [student, setStudent] = useState<StudentData>();

  const test = [
    { id: 1, label: "Name of pupil (in Block Letters)", data: "" },
    {
      id: 2,
      label:
        "Name of Parent/Guardian and relationship of the pupil to the guardian",
      data: "",
    },
    { id: 3, label: "Identification Marks", data: "" },
    { id: 4, label: "Nationality", data: "" },
    { id: 5, label: "Religion and caste", data: "" },
    {
      id: 6,
      label:
        "Whether the candidate belongs to Scheduled Caste or Scheduled Tribe or Other Backward Community or Whether he/she is a convert from the scheduled caste or Scheduled Tribe, if so specify",
    },
    {
      id: 7,
      label: "Date of Birth according to admission register",
      subfields: ["In figure", "In words"],
      data: "",
    },
    { id: 8, label: "Course to which the pupil was enrolled", data: "" },
    { id: 9, label: "Date of admission or promotion to the class", data: "" },
    {
      id: 10,
      label: "Whether qualified for promotion to a higher class",
      data: "",
    },
    {
      id: 11,
      label: "Date of the student's last attendance at the institution",
    },
    {
      id: 12,
      label: "Date on which the name was removed from rolls",
      data: "",
    },
    { id: 13, label: "Date of application for certificate" },
    { id: 14, label: "Reason for leaving" },
    {
      id: 15,
      label: "Institution to which the student intends to proceed",
    },
    { id: 16, label: "No. of working days till date" },
    { id: 17, label: "No. of days the students attended" },
  ];
  const [data, setData] = useState(test);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetRequest(`staff/student/${id}`);
        if (response.status === 200) {
          const Data = await response.json();
          setStudent(Data.data);
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
      }
    };
    getData();
  }, []);

  return (
    <div className="   bg-gray-100 py-8 px-4">
      <div className="flex justify-end">
        <Button onClick={() => reactToPrintFn()}>Print</Button>
      </div>
      <div
        className="mx-auto bg-white rounded-lg shadow-lg p-8 max-h-[1123px] h-[1123px] max-w-[794px]"
        ref={contentRef}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <School className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            COLLEGE OF APPLIED SCIENCE
          </h1>
          <p className="text-gray-600 text-sm">
            (MANAGED BY IHRD, A GOVT OF KERALA UNDERTAKING)
          </p>
          <p className="text-gray-600 text-sm">
            THAMARASSERY, KOZHIKODE - 673573
          </p>
          <h2 className="text-lg font-bold mt-2 text-gray-800">
            TRANSFER CERTIFICATE
          </h2>
          <div className="flex justify-between mt-2 text-sm">
            <p>
              TC No. <span className="text-red-600 font-semibold">2593</span>
            </p>
            <p>Admin No:</p>
          </div>
        </div>

        <div className=" text-xs">
          {data.map((field) => (
            <div key={field.id} className="grid grid-cols-12 gap-4 ">
              <div className="col-span-1 text-gray-600">{field.id}</div>
              <div className="col-span-5 font-medium text-gray-700">
                {field.label}
              </div>
              <div className="col-span-6">
                {field.subfields ? (
                  <div className="space-y-2">
                    {field.subfields.map((subfield) => (
                      <div key={subfield} className="flex items-center">
                        <span className="w-24 text-sm text-gray-600">
                          {subfield}:
                        </span>
                        <div className="flex-1 h-8 border-b border-gray-300"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className=" py-2 border-b border-gray-300">
                    {field.data ? field.data : ""}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 grid grid-cols-2 gap-8 text-xs">
          <div>
            <p className="mb-2">Place:.................................</p>
            <p>Date:.................................</p>
          </div>
          <div className="text-right">
            <p className="italic text-gray-600">Head of Institution</p>
          </div>
        </div>

        {/* Course and Conduct Certificate */}
        <div className=" mt-2 border-t pt-2">
          <h3 className="text-center font-bold underline">
            COURSE AND CONDUCT CERTIFICATE
          </h3>
          <div className="space-y-1 text-xs mt-3">
            <p>
              Certified that
              Sri./Smt........................................................................................................
            </p>
            <p>
              was a student in this institution for
              the........................................................................................
            </p>
            <p>
              course in/from the academic
              year/s................................................to........................................
            </p>
            <p>
              His/Her conduct and character during the period
              were........................................................................
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <p className="mb-2">Place:.................................</p>
                <p>Date:.................................</p>
              </div>
              <div className="text-right">
                <p className="italic text-gray-600">Head of Institution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

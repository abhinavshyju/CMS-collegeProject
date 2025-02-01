import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Layout from "./layout/layout";
import AddStudents from "./pages/students/add-students";
import ViewStudents from "./pages/students/view-students";
import "react-toastify/dist/ReactToastify.css";
import ViewStudent from "./pages/students/view-student";
import CreateStudent from "./pages/students/create-student";
import AcceptStudentTable from "./pages/students/accept-students";
import EditForm from "./pages/students/child/edit-form";
import StudentDetailsDisplay from "./pages/students/view-student";
import PrintPage from "./pages/students/print-page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "add-students",
          element: <AddStudents />,
        },
        {
          path: "view-students",
          element: <ViewStudents />,
        },
        {
          path: "view-students/:id",
          element: <StudentDetailsDisplay />,
        },
        {
          path: "create-student",
          element: <CreateStudent />,
        },
        {
          path: "accept-student",
          element: <AcceptStudentTable />,
        },
        {
          path: "accept-student/:id",
          element: <EditForm />,
        },
        {
          path: "print-student/:id",
          element: <PrintPage />,
        },
      ],
    },
  ]);
  return (
    <div className="select-none">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Layout from "./layout/layout";
import AddStudents from "./pages/students/add-students";
import ViewStudents from "./pages/students/view-students";
import "react-toastify/dist/ReactToastify.css";
import ViewStudent from "./pages/students/view-student";

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
          path: "view-students/:admissionNumber",
          element: <ViewStudent />,
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

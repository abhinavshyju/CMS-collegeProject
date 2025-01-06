import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./page";
import FacultyPage from "./page/faculty";
import { MainLayout } from "./layout";
import StaffPage from "./page/staff/index.";

import LoginPage from "./page/login";
import DepartmentPage from "./page/department";
import ClassPage from "./page/class";
import UtilPage from "./page/uitls";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard/class",
          element: <ClassPage />,
        },
        {
          path: "/dashboard/department",
          element: <DepartmentPage />,
        },
        {
          path: "/dashboard/faculty",
          element: <FacultyPage />,
        },
        {
          path: "/dashboard/staff",
          element: <StaffPage />,
        },
        {
          path: "/dashboard/utils",
          element: <UtilPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;

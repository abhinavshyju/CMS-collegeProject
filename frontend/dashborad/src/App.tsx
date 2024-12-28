import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./page";
import FacultyPage from "./page/faculty";
import { MainLayout } from "./layout";
import StaffPage from "./page/staff/index.";

import LoginPage from "./page/login";

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
          path: "/dashboard/faculty",
          element: <FacultyPage />,
        },
        {
          path: "/dashboard/staff",
          element: <StaffPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;

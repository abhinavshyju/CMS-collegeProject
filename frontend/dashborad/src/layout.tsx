import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { useEffect } from "react";

export function MainLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        console.log("No token found");
        navigate("/login");
      }
      console.log(token);
    };
    checkToken();
  }, []);
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-1 overflow-auto pl-[255px] ">
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

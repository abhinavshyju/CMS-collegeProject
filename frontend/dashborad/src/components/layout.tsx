import { useEffect } from "react";
import { Sidebar } from "./sidebar";
import { useNavigate } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="flex min-h-screen w-full ">
      <Sidebar />
      <div className="flex-1 overflow-auto pl-[255px]">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

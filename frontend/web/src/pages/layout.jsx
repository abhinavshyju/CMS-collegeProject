import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Layout() {
  return (
    <div className="bg-white flex flex-col relative">
      <Navbar />
      <Outlet />
    </div>
  );
}

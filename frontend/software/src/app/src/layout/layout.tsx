import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      this layout
      <Outlet />
    </div>
  );
};

export default Layout;

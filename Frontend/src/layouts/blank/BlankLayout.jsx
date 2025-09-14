import { Outlet } from "react-router-dom";

const BlankLayout = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <Outlet />
  </div>
);

export default BlankLayout;
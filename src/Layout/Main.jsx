import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <ToastContainer />
      <Outlet></Outlet>
    </div>
  );
};

export default Main;

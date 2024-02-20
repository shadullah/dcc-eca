import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/Pages/Login/Login";
import Profile from "../components/Pages/Profile/Profile";
import Dashboard from "../components/Pages/Profile/Dashboard";
// import PrivateRoutes from "../privateRoute/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        loader: () => fetch("https://dcc-server.vercel.app/users/"),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
        loader: () => fetch("https://dcc-server.vercel.app/users/"),
      },
    ],
  },
]);

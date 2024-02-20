import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
// import Loading from "../Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  //   if (loading) {
  //     return <Loading></Loading>;
  //   }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default PrivateRoutes;

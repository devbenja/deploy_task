import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = ({ children }) => {

  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }


  return children ? children : <Outlet />

}

export const PrivateRoute = ({ children }) => {

  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />

}
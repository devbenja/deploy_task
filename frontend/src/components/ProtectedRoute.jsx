import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectTo, Authenticated, children }) => {
  
  if (!Authenticated) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;

};
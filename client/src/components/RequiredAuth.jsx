import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserRoles } from "../utils/utils";

const RequireAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // console.log(checkUserRoles(user));
  return checkUserRoles(user) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

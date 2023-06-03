import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
export const ProtectedRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <Spinner />;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

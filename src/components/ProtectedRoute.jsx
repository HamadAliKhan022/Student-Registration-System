import { Navigate, Outlet } from "react-router-dom";
import { getCurrentStudentEmail } from "../utils/studentStorage";

export default function ProtectedRoute() {
  const currentStudentEmail = getCurrentStudentEmail();

  return currentStudentEmail ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

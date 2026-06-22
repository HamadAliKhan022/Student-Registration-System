import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import {
  getCurrentStudentEmail,
  getStudents,
  setCurrentStudentEmail
} from "../utils/studentStorage";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");

  const currentStudentEmail = getCurrentStudentEmail();

  if (currentStudentEmail) {
    return <Navigate to="/dashboard" replace />;
  }

  function loginStudent(data) {
    setLoginError("");

    const email = data.email.trim().toLowerCase();

    const student = getStudents().find(
      (savedStudent) =>
        savedStudent.email?.toLowerCase() === email &&
        savedStudent.password === data.password
    );

    if (!student) {
      setLoginError(
        "Email or password is incorrect. Please try again."
      );
      return;
    }

    setCurrentStudentEmail(student.email);

    navigate("/dashboard", {
      replace: true
    });
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to view your personal student profile."
      icon={<LoginRoundedIcon />}
      footer={
        <Typography variant="body2" color="text.secondary">
          New student here?{" "}
          <Button
            component={RouterLink}
            to="/signup"
            size="small"
            sx={{
              minHeight: "auto",
              px: 0.5,
              color: "primary.main"
            }}
          >
            Create an account
          </Button>
        </Typography>
      }
    >
      <LoginForm
        onSubmit={loginStudent}
        loginError={loginError}
        notice={location.state?.notice}
      />
    </AuthLayout>
  );
}

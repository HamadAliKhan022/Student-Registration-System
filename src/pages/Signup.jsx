import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AuthLayout from "../components/AuthLayout";
import StudentForm from "../components/StudentForm";
import {
  getCurrentStudentEmail,
  getStudents,
  saveStudents
} from "../utils/studentStorage";

export default function Signup() {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const currentStudentEmail = getCurrentStudentEmail();

  if (currentStudentEmail) {
    return <Navigate to="/dashboard" replace />;
  }

  function saveStudent(data) {
    setSignupError("");

    const students = getStudents();
    const email = data.email.trim().toLowerCase();

    const accountAlreadyExists = students.some(
      (student) =>
        student.email?.toLowerCase() === email
    );

    if (accountAlreadyExists) {
      setSignupError(
        "An account already exists with this email. Please log in."
      );
      return;
    }

    const {
      confirmPassword,
      ...studentDetails
    } = data;

    const newStudent = {
      ...studentDetails,
      id:
        typeof crypto !== "undefined" &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      fullName: data.fullName.trim(),
      email,
      registrationNumber:
        data.registrationNumber.trim(),
      createdAt: new Date().toISOString()
    };

    saveStudents([...students, newStudent]);

    navigate("/login", {
      replace: true,
      state: {
        notice:
          "Account created successfully. You can log in now."
      }
    });
  }

  return (
    <AuthLayout
      title="Student Registration"
      subtitle="Create your portal account to manage your details."
      icon={<SchoolRoundedIcon />}
      footer={
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Button
            component={RouterLink}
            to="/login"
            size="small"
            sx={{
              minHeight: "auto",
              px: 0.5,
              color: "primary.main"
            }}
          >
            Log in
          </Button>
        </Typography>
      }
    >
      <StudentForm
        onSubmit={saveStudent}
        serverError={signupError}
      />
    </AuthLayout>
  );
}

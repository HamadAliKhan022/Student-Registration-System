import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import {
  clearCurrentStudent,
  getCurrentStudentEmail,
  getStudents
} from "../utils/studentStorage";

export default function Dashboard() {
  const navigate = useNavigate();

  const currentStudentEmail = getCurrentStudentEmail();

  const student = getStudents().find(
    (savedStudent) =>
      savedStudent.email?.toLowerCase() ===
      currentStudentEmail?.toLowerCase()
  );

  if (!student) {
    clearCurrentStudent();
    return <Navigate to="/login" replace />;
  }

  function logout() {
    clearCurrentStudent();

    navigate("/login", {
      replace: true
    });
  }

  const studentInfo = [
    {
      label: "Email address",
      value: student.email,
      icon: <EmailOutlinedIcon />
    },
    {
      label: "Registration number",
      value: student.registrationNumber,
      icon: <BadgeOutlinedIcon />
    },
    {
      label: "Department",
      value: student.department,
      icon: <AccountBalanceOutlinedIcon />
    },
    {
      label: "Current semester",
      value: `Semester ${student.semester}`,
      icon: <MenuBookOutlinedIcon />
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        py: { xs: 3, sm: 6 },
        backgroundColor: "#F3F6F8",
        backgroundImage:
          "radial-gradient(circle at 8% 10%, rgba(105, 142, 168, 0.14), transparent 25%), radial-gradient(circle at 90% 90%, rgba(107, 140, 122, 0.14), transparent 28%)"
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            border: "1px solid rgba(103, 125, 141, 0.14)",
            boxShadow: "0 22px 55px rgba(36, 55, 70, 0.10)",
            borderRadius: 5
          }}
        >
          <Box
            sx={{
              px: { xs: 3, sm: 5 },
              py: { xs: 3, sm: 4 },
              background:
                "linear-gradient(135deg, rgba(78, 112, 142, 0.12), rgba(107, 140, 122, 0.08))"
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: {
                  xs: "flex-start",
                  sm: "center"
                }
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 58,
                    height: 58,
                    bgcolor: "primary.main",
                    fontSize: 22,
                    fontWeight: 700
                  }}
                >
                  {student.fullName
                    .split(" ")
                    .map((name) => name[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </Avatar>

                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      letterSpacing: 1
                    }}
                  >
                    Student Portal
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: {
                        xs: 27,
                        sm: 32
                      }
                    }}
                  >
                    Welcome, {student.fullName}
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="outlined"
                startIcon={<LogoutRoundedIcon />}
                onClick={logout}
                sx={{
                  borderColor: "rgba(78, 112, 142, 0.35)",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(78, 112, 142, 0.06)"
                  }
                }}
              >
                Logout
              </Button>
            </Stack>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={2.5}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{
                  justifyContent: "space-between",
                  alignItems: {
                    xs: "flex-start",
                    sm: "center"
                  }
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Your student profile
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    These details are only visible for the student who is logged in.
                  </Typography>
                </Box>

                <Chip
                  icon={<SchoolRoundedIcon />}
                  label="Active student"
                  sx={{
                    bgcolor: "rgba(107, 140, 122, 0.13)",
                    color: "#456653",
                    fontWeight: 700
                  }}
                />
              </Stack>

              <Divider
                sx={{
                  borderColor: "rgba(103, 125, 141, 0.16)"
                }}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr"
                  },
                  gap: 2
                }}
              >
                {studentInfo.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 2.2,
                      borderRadius: 3,
                      border:
                        "1px solid rgba(103, 125, 141, 0.14)",
                      bgcolor: "#FAFCFD"
                    }}
                  >
                    <Stack direction="row" spacing={1.4} sx={{ alignItems: "center" }}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 38,
                          height: 38,
                          bgcolor: "rgba(78, 112, 142, 0.10)",
                          color: "primary.main",
                          borderRadius: 2
                        }}
                      >
                        {item.icon}
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {item.label}
                        </Typography>

                        <Typography
                          variant="body1"
                          fontWeight={700}
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

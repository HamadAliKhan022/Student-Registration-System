import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField
} from "@mui/material";

export default function StudentForm({ onSubmit, serverError }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      registrationNumber: "",
      department: "CS",
      semester: "1",
      password: "",
      confirmPassword: ""
    }
  });

  const password = watch("password");

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr"
        },
        gap: 1.8
      }}
    >
      {serverError && (
        <Alert
          severity="error"
          sx={{
            gridColumn: "1 / -1",
            borderRadius: 3
          }}
        >
          {serverError}
        </Alert>
      )}

      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        rules={{
          required: "Full name is required",
          validate: (value) =>
            value.trim().length >= 2 || "Enter at least 2 characters"
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Full name"
            placeholder="Enter your full name"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            sx={{ gridColumn: "1 / -1" }}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address"
          }
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Email address"
            placeholder="student@example.com"
            type="email"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            sx={{ gridColumn: "1 / -1" }}
          />
        )}
      />

      {/* Registration Number */}
      <Controller
        name="registrationNumber"
        control={control}
        rules={{
          required: "Registration number is required",
          minLength: {
            value: 4,
            message: "Enter a valid registration number"
          }
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Registration number"
            placeholder="FA21-BCS-001"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            sx={{ gridColumn: "1 / -1" }}
          />
        )}
      />

      {/* Department */}
      <Controller
        name="department"
        control={control}
        rules={{
          required: "Select a department"
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            select
            label="Department"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          >
            <MenuItem value="CS">Computer Science</MenuItem>
            <MenuItem value="SE">Software Engineering</MenuItem>
            <MenuItem value="AI">Artificial Intelligence</MenuItem>
            <MenuItem value="DS">Data Science</MenuItem>
          </TextField>
        )}
      />

      {/* Semester */}
      <Controller
        name="semester"
        control={control}
        rules={{
          required: "Select a semester"
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            select
            label="Semester"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <MenuItem key={semester} value={String(semester)}>
                Semester {semester}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Password"
            placeholder="At least 6 characters"
            type="password"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match"
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            label="Confirm password"
            placeholder="Enter your password again"
            type="password"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{
          gridColumn: "1 / -1",
          mt: 0.5,
          bgcolor: "primary.main",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#3D5F7E",
            boxShadow: "none"
          }
        }}
      >
        {isSubmitting ? "Creating account..." : "Create student account"}
      </Button>
    </Box>
  );
}
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
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onTouched",
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

      <TextField
        label="Full name"
        placeholder="Enter your full name"
        error={Boolean(errors.fullName)}
        helperText={errors.fullName?.message}
        sx={{ gridColumn: "1 / -1" }}
        {...register("fullName", {
          required: "Full name is required",
          validate: (value) =>
            value.trim().length >= 2 ||
            "Enter at least 2 characters"
        })}
      />

      <TextField
        label="Email address"
        placeholder="student@example.com"
        type="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        sx={{ gridColumn: "1 / -1" }}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address"
          }
        })}
      />

      <TextField
        label="Registration number"
        placeholder="FA21-BCS-001"
        error={Boolean(errors.registrationNumber)}
        helperText={errors.registrationNumber?.message}
        sx={{ gridColumn: "1 / -1" }}
        {...register("registrationNumber", {
          required: "Registration number is required",
          minLength: {
            value: 4,
            message: "Enter a valid registration number"
          }
        })}
      />

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

      <TextField
        label="Password"
        placeholder="At least 6 characters"
        type="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        })}
      />

      <TextField
        label="Confirm password"
        placeholder="Enter your password again"
        type="password"
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match"
        })}
      />

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

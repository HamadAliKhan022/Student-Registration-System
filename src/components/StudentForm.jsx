import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  TextField
} from "@mui/material";

// Reusable input component inside the same file
function FormTextField({
  name,
  control,
  rules,
  children,
  helperText,
  ...textFieldProps
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ""}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? helperText}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default function StudentForm({ onSubmit, serverError }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting }
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

      <FormTextField
        name="fullName"
        control={control}
        label="Full name"
        placeholder="Enter your full name"
        sx={{ gridColumn: "1 / -1" }}
        rules={{
          required: "Full name is required",
          validate: (value) =>
            value.trim().length >= 2 ||
            "Enter at least 2 characters"
        }}
      />

      <FormTextField
        name="email"
        control={control}
        label="Email address"
        placeholder="student@example.com"
        type="email"
        sx={{ gridColumn: "1 / -1" }}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address"
          }
        }}
      />

      <FormTextField
        name="registrationNumber"
        control={control}
        label="Registration number"
        placeholder="FA21-BCS-001"
        sx={{ gridColumn: "1 / -1" }}
        rules={{
          required: "Registration number is required",
          minLength: {
            value: 4,
            message: "Enter a valid registration number"
          }
        }}
      />

      <FormTextField
        name="department"
        control={control}
        select
        label="Department"
        rules={{
          required: "Select a department"
        }}
      >
        <MenuItem value="CS">Computer Science</MenuItem>
        <MenuItem value="SE">Software Engineering</MenuItem>
        <MenuItem value="AI">Artificial Intelligence</MenuItem>
        <MenuItem value="DS">Data Science</MenuItem>
      </FormTextField>

      <FormTextField
        name="semester"
        control={control}
        select
        label="Semester"
        rules={{
          required: "Select a semester"
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
          <MenuItem key={semester} value={String(semester)}>
            Semester {semester}
          </MenuItem>
        ))}
      </FormTextField>

      <FormTextField
        name="password"
        control={control}
        label="Password"
        placeholder="At least 6 characters"
        type="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        }}
      />

      <FormTextField
        name="confirmPassword"
        control={control}
        label="Confirm password"
        placeholder="Enter your password again"
        type="password"
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match"
        }}
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
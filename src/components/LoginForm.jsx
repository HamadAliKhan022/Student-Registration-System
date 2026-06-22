import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  TextField
} from "@mui/material";

export default function LoginForm({
  onSubmit,
  loginError,
  notice
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      {notice && (
        <Alert severity="success" sx={{ borderRadius: 3 }}>
          {notice}
        </Alert>
      )}

      {loginError && (
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {loginError}
        </Alert>
      )}

      <TextField
        label="Email address"
        placeholder="student@example.com"
        type="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address"
          }
        })}
      />

      <TextField
        label="Password"
        placeholder="Enter your password"
        type="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        {...register("password", {
          required: "Password is required"
        })}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{
          mt: 0.5,
          bgcolor: "primary.main",
          boxShadow: "none",
          "&:hover": {
            bgcolor: "#3D5F7E",
            boxShadow: "none"
          }
        }}
      >
        {isSubmitting ? "Signing in..." : "Log in"}
      </Button>
    </Box>
  );
}

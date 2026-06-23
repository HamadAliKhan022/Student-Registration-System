import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function FormTextField({
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
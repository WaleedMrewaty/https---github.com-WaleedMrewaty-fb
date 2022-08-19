/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from "@mui/material";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface FormTextFieldProps {
  name: string;
  label: string;
  multiline?: boolean;
  control: Control<any, object>;
  disabled?: boolean;
  readOnly?: boolean;
  [key: string]: any;
}

const FormTextField: FC<FormTextFieldProps> = ({
  name,
  control,
  label,
  multiline = false,
  disabled = false,
  readOnly = false,
  ...props
}) => (
  <div>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          multiline={multiline}
          rows={multiline ? 4 : 1}
          variant="outlined"
          disabled={disabled}
          fullWidth
          label={label}
          {...field}
          error={!!error}
          helperText={error && error.message}
          {...props}
          InputProps={{
            readOnly,
          }}
        />
      )}
    />
  </div>
);

export default FormTextField;

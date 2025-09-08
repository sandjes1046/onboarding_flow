import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function FormTextField({ multiline=false,rows=1,placeholder="",name, control, rules, label, type = "text",slotProps={},key,fullWidth = false }) {
  return (
    <div key={key}>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <TextField
                {...field}
                type={type}
                label={label}
                fullWidth={fullWidth}
                error={!!fieldState.error}
                multiline={multiline}
                rows={rows}
                placeholder={placeholder}
                helperText={fieldState.error?.message}
                slotProps={slotProps}
                />
            )}
        />
    </div>
  );
}

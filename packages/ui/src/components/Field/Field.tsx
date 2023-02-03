import React from "react";
import { TextField } from "../TextField";

type FieldType = {
    field: {
        name: string;
        value: string;
        onChange: () => {};
        onBlur: () => {};
    };
};

export const CustomInputComponent = ({ field, ...props }: FieldType) => (
    <TextField {...field} {...props} fullWidth sx={{ mb: 2 }} />
);

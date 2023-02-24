import React from "react";
import { TextField } from "../TextField";
import { Textarea } from "../Textarea";

type FieldProps = {
    field: {
        name: string;
        value: string;
        onChange: () => void;
        onBlur: () => void;
    };
};

export const CustomTextareaComponent = ({ field, ...props }: FieldProps) => (
    <Textarea {...field} {...props} />
);

export const CustomInputComponent = ({ field, ...props }: FieldProps) => {
    return <TextField {...field} {...props} />;
};

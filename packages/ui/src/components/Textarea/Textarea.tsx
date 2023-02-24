import React from "react";

import { styled, Theme } from "@mui/material/styles";
import MuiTextareaAutosize, {
    TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";

const styles = ({ theme }: { theme: Theme }) => ({});

export interface TextareaProps extends Omit<TextareaAutosizeProps, "size"> {
    noBorder?: boolean;
    size?: "small" | "medium" | "large" | "xlarge";
}

const TextareaRoot = (props: TextareaProps) => {
    const { noBorder, size = "medium", ...other } = props;
    return <MuiTextareaAutosize {...props} />;
};

export const Textarea = styled(TextareaRoot)(styles);

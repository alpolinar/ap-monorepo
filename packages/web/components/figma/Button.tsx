import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import MuiButton, { ButtonProps } from "@mui/material/Button";

interface ExtraButtonProps {
    borderRadius?: number;
    bordered?: boolean;
}

const ButtonRoot = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== "borderRadius",
})<ExtraButtonProps>(({ theme, size, variant, borderRadius, bordered }) => ({
    borderRadius: borderRadius,
    fontWeight: 600,
    fontFamily: theme.typography.fontFamily,
    fontStyle: "normal",
    textTransform: "none",
    lineHeight: theme.typography.pxToRem(14),
    padding: theme.spacing(2, 4),
    fontSize: theme.typography.pxToRem(14),
    boxShadow: "none",
    "&:active, &:focus": {
        boxShadow: "none",
    },
    ...(variant === "text" && {
        "&:hover": {
            background: "none",
        },
    }),
    ...(variant === "contained" && {
        background: bordered ? "white" : "#333333",
        color: bordered ? "#333333" : theme.palette.background.default,
        border: "2px solid",
        borderColor: "#333333",
        "&:hover": {
            background: bordered
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
            color: theme.palette.background.default,
            borderColor: bordered
                ? theme.palette.primary.dark
                : theme.palette.primary.light,
        },
    }),
    ...(size === "small" && {
        borderRadius: !borderRadius ? 6 : borderRadius,
        padding: theme.spacing(1.5, 3),
        minWidth: 87,
        maxHeight: 36,
        fontSize: theme.typography.pxToRem(12),
    }),
    ...(size === "large" && {
        borderRadius: !borderRadius ? 8 : borderRadius,
        padding: theme.spacing(2, 4.5),
        minWidth: 160,
        maxHeight: 46,
        fontSize: theme.typography.pxToRem(14),
    }),
}));

function FButton<C extends React.ElementType>(
    props: ButtonProps<C, { component?: C } & ExtraButtonProps>
) {
    const { bordered } = props;
    return <ButtonRoot bordered={bordered} {...props} />;
}

export default FButton;

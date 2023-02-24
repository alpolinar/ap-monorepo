import { inputLabelClasses } from "@mui/material/InputLabel";
import { selectClasses } from "@mui/material/Select";
import { styled, Theme } from "@mui/material/styles";
import MuiTextField, {
    FilledTextFieldProps,
    StandardTextFieldProps,
} from "@mui/material/TextField";
import clsx from "clsx";
import React from "react";

const inputStyleMappingClasses = {
    small: "TextField-inputSizeSmall",
    medium: "TextField-inputSizeMedium",
    large: "TextField-inputSizeLarge",
    xlarge: "TextField-inputSizeXLarge",
};

const classes = {
    root: "TextField-root",
    input: "TextField-input",
    inputBorder: "TextField-inputBorder",
};

const styles = ({ theme }: { theme: Theme }) => ({
    [`& .${classes.root}`]: {
        padding: 0,
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    [`& .${classes.input}`]: {
        minWidth: theme.spacing(6),
        backgroundColor: theme.palette.common.white,
        "&.Mui-disabled": {
            backgroundColor: theme.palette.divider,
        },
    },
    [`& .${classes.inputBorder}`]: {
        border: "1px solid #e9ddd0",
        "&:focus": {
            borderColor: theme.palette.secondary.main,
        },
    },
    [`& .${inputStyleMappingClasses.small}`]: {
        fontSize: 14,
        padding: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(2)})`,
    },
    [`& .${inputStyleMappingClasses.medium}`]: {
        fontSize: 16,
        padding: theme.spacing(2),
        width: `calc(100% - ${theme.spacing(4)})`,
    },
    [`& .${inputStyleMappingClasses.large}`]: {
        fontSize: 18,
        padding: 20,
        width: `calc(100% - ${20 * 2}px)`,
    },
    [`& .${inputStyleMappingClasses.xlarge}`]: {
        fontSize: 20,
        padding: 25,
        width: `calc(100% - ${25 * 2}px)`,
    },
    [`& .${inputLabelClasses.root}`]: {
        fontSize: 18,
    },
    [`& .${selectClasses.select}`]: {
        height: "auto",
        borderRadius: 0,
    },
    [`& .${selectClasses.icon}`]: {
        top: "50%",
        marginTop: -12,
    },
});

const TextFieldRoot = styled(MuiTextField)(styles);

export interface TextFieldProps extends Omit<StandardTextFieldProps, "size"> {
    noBorder?: boolean;
    size?: "small" | "medium" | "large" | "xlarge";
}

export function TextField(props: TextFieldProps) {
    const {
        InputProps = {},
        InputLabelProps,
        noBorder,
        size = "medium",
        SelectProps,
        ...other
    } = props;

    const {
        classes: {
            input: InputPropsClassesInput,
            ...InputPropsClassesOther
        } = {},
        ...InputPropsOther
    } = InputProps;

    return (
        <TextFieldRoot
            InputProps={{
                classes: {
                    root: classes.root,
                    input: clsx(
                        classes.input,
                        inputStyleMappingClasses[size],
                        {
                            [classes.inputBorder]: !noBorder,
                        },
                        InputPropsClassesInput
                    ),
                    ...InputPropsClassesOther,
                },
                ...InputPropsOther,
            }}
            InputLabelProps={{
                ...InputLabelProps,
                shrink: true,
            }}
            SelectProps={SelectProps}
            {...other}
        />
    );
}

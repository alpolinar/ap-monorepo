import React, { useId } from "react";

import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";

const DialogRoot = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
    "& .MuiPaper-root": {
        minWidth: 400,
    },
}));

type DialogTitleProps = {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
    dialogIcon?: React.ReactNode;
};

const DialogRootTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            <Grid container justifyContent="space-between">
                <Grid item display="flex">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                    >
                        {children}
                    </Box>
                </Grid>
                <Grid item>
                    {onClose ? (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                right: 9,
                                top: 9,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </Grid>
            </Grid>
        </DialogTitle>
    );
};

type ProductDialogProps = {
    open: boolean;
    title: string;
    children?: React.ReactNode;
    onClose: () => void;
    dialogIcon?: React.ReactNode;
};

export function SimpleDialog(props: ProductDialogProps) {
    const { onClose, open, title, children, dialogIcon } = props;
    const dialogId = useId();
    return (
        <DialogRoot open={open} onClose={onClose}>
            <DialogRootTitle id={dialogId} onClose={onClose}>
                {dialogIcon}
                {title}
            </DialogRootTitle>
            {children && <DialogContent dividers>{children}</DialogContent>}
        </DialogRoot>
    );
}

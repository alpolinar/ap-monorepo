import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

import Grid from "@mui/material/Grid";

interface ILoading {
    type: LoadingType;
    color: string;
    height: number;
    width: number;
}

export default function Loading({ type, color, height, width }: ILoading) {
    return (
        <Grid container justifyContent="center">
            <Grid item>
                <ReactLoading
                    type={type}
                    color={color}
                    height={height}
                    width={width}
                />
            </Grid>
        </Grid>
    );
}

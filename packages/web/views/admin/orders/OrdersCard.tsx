import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import { Typography } from "@/../ui/src";

type OrdersCardProps = {
    name: string;
    image: string;
    CardProps: {};
};

export const OrdersCard = (props: OrdersCardProps) => {
    return (
        <Card sx={{ display: "flex", ...props.CardProps }}>
            <CardMedia
                component="img"
                sx={{ maxWidth: 200, maxHeight: 100 }}
                image={props.image}
                alt={props.name}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                    minWidth: 200,
                }}
            >
                <Typography>{props.name}</Typography>
            </Box>
        </Card>
    );
};

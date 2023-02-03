import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@/components/Typography";

type ProductCardProps = {
    id?: string;
    image?: string;
    name?: string;
    description?: string;
};

export default function ProductCard({
    id,
    name,
    image,
    description,
}: ProductCardProps) {
    return (
        <Card sx={{ width: 280 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={
                    image
                        ? image
                        : "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                }
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name ?? "Some Resort"}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {description ?? "Some Description"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={`/products/${id}`} size="small">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

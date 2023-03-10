import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import { Typography, TextField } from "@ap-monorepo/ui";

function Copyright() {
    return (
        <React.Fragment>
            {"© "}
            Awesome e-Comm
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "warning.main",
    mr: 1,
    "&:hover": {
        bgcolor: "warning.dark",
    },
};

const LANGUAGES = [
    {
        code: "en-US",
        name: "English",
    },
    {
        code: "fr-FR",
        name: "Français",
    },
];

export default function Footer() {
    return (
        <Typography
            component="footer"
            sx={{ display: "flex", bgcolor: "secondary.light", p: 8 }}
        >
            <Container sx={{ display: "flex" }}>
                <Grid
                    container
                    spacing={5}
                    justifyContent="space-between"
                    direction="row"
                >
                    <Grid item xs={12} sm={4}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item sx={{ display: "flex" }}>
                                <Box component="a" sx={iconStyle}>
                                    <FacebookIcon color="secondary" />
                                </Box>
                                <Box component="a" sx={iconStyle}>
                                    <TwitterIcon color="secondary" />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Legal
                        </Typography>
                        <Box
                            component="ul"
                            sx={{ m: 0, listStyle: "none", p: 0 }}
                        >
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/terms">Terms</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/privacy">Privacy</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Language
                        </Typography>
                        <TextField
                            select
                            size="medium"
                            variant="standard"
                            SelectProps={{
                                native: true,
                            }}
                            sx={{ mt: 1, width: 150 }}
                        >
                            {LANGUAGES.map((language) => (
                                <option
                                    value={language.code}
                                    key={language.code}
                                >
                                    {language.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}

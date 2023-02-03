import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/store";

import FAppBar from "@/components/figma/AppBar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <FAppBar />
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}

import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../utils/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/store";
import { wrapper } from "@/store/store";

import FAppBar from "@/components/figma/AppBar";

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
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

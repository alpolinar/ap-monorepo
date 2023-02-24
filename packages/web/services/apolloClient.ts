import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    createHttpLink,
    ApolloClientOptions,
} from "@apollo/client";

import { HttpOptions } from "@apollo/client/link/http/selectHttpOptionsAndBody";

import { IncomingMessage } from "http";

type ClientProps = {
    req?: IncomingMessage & {
        cookies: Partial<{
            [key: string]: string;
        }>;
    };
    ssrMode?: boolean;
};

export const apolloClient = ({
    req,
    ssrMode,
}: ClientProps): ApolloClient<NormalizedCacheObject> => {
    let createHttpLinkConfig: HttpOptions = {
        uri: `${process.env.NEXT_PUBLIC_NEST_API}/graphql`,
        credentials: "same-origin",
    };

    if (req)
        createHttpLinkConfig.headers = { cookie: req?.headers.cookie || "" };

    let apolloClientConfig: ApolloClientOptions<NormalizedCacheObject> = {
        ssrMode,
        link: createHttpLink(createHttpLinkConfig),
        cache: new InMemoryCache(),
    };

    return new ApolloClient(apolloClientConfig);
};

import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";

export const client = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_NEST_API}/graphql`,
        cache: new InMemoryCache(),
    });
};

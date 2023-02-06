import React from "react";
import { GetServerSidePropsContext } from "next";

import AppContainer from "@/views/common/AppContainer";
import Footer from "@/views/common/Footer";

import { Typography } from "@ap-monorepo/ui";

export default function Terms() {
    return (
        <>
            <AppContainer>
                <Typography variant="h3">Terms</Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    eos alias sint asperiores nostrum nemo laborum earum error.
                    Voluptas enim commodi expedita repellat nemo debitis
                    veritatis assumenda impedit non quasi aliquam quis in sequi
                    fugiat aut doloremque ad accusantium deserunt,
                    exercitationem dolor dolores reiciendis eos ea. A natus in
                    consequatur.
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    eos alias sint asperiores nostrum nemo laborum earum error.
                    Voluptas enim commodi expedita repellat nemo debitis
                    veritatis assumenda impedit non quasi aliquam quis in sequi
                    fugiat aut doloremque ad accusantium deserunt,
                    exercitationem dolor dolores reiciendis eos ea. A natus in
                    consequatur.
                </Typography>
            </AppContainer>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    console.log("Server Side Props");

    return {
        props: {},
    };
}

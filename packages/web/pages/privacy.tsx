import React from "react";
import { GetServerSidePropsContext } from "next";

import AppContainer from "@/views/common/AppContainer";
import Footer from "@/views/common/Footer";

import { Typography } from "@ap-monorepo/ui";

export default function Privacy() {
    return (
        <>
            <AppContainer>
                <Typography variant="h3">Privacy</Typography>
                <Typography variant="body1" paragraph>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nam dolor accusamus eveniet nobis accusantium reprehenderit
                    culpa modi velit esse, omnis veritatis quis consequatur est
                    rem non assumenda nesciunt voluptatem iste minima repellat
                    illum labore earum libero. Delectus rem facere similique
                    impedit praesentium, sequi minima magnam architecto
                    distinctio est, inventore dolorem nisi minus dicta
                    perspiciatis culpa atque quidem ab saepe sit fugiat,
                    laudantium beatae adipisci. Provident totam sit numquam,
                    dicta dolores perspiciatis similique laborum velit, nobis
                    maiores cupiditate ea, ipsa maxime. Consequatur aperiam ad
                    esse, maiores itaque eum veniam at! Quas accusamus magnam
                    recusandae facere nisi laudantium voluptates a cum fugiat.
                </Typography>
                <Typography variant="body1" paragraph>
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

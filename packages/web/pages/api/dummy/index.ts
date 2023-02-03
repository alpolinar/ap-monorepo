import { NextApiRequest, NextApiResponse } from "next";

export default function dummy(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).send(`
    Available endpoints
    /dummy/dummy-create-user
    /dummy/dummy-create-product
    `);
}

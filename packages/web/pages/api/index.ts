import { NextApiRequest, NextApiResponse } from "next";

export const hello = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).send("hello endpoint");
};

export default hello;

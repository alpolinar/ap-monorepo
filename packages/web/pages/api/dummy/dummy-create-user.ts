import { NextApiRequest, NextApiResponse } from "next";
import { dummyCreateUser } from "../../../db/sqlite/db";

export default async function dummyUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dummyCreateUser();
    return res.status(200).send("create dummy users");
}

import { NextApiRequest, NextApiResponse } from "next";
import { updateUser, searchUser } from "@/db/sqlite/db";

export default async function updateAccount(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id, name, email } = req.body;
    const result = await updateUser({ id, name, email });
    if (!result)
        return res.status(400).send("I don't know what happened. Sorry!");

    const userData = await searchUser(id);
    return res.status(200).send(userData);
}

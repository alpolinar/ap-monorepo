import { NextApiRequest, NextApiResponse } from "next";
import { authRefresh } from "@/db/sqlite/db";

export default async function refresh(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.headers?.authorization?.split(" ")[1];
    if (!id) return res.status(400).send("Token required");

    const authState = await authRefresh(id);
    const data = {
        record: authState,
    };
    if (!data) return res.status(400).send(data);
    return res.status(200).send(data);
}

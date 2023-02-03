import { NextApiRequest, NextApiResponse } from "next";
import { authUser } from "@/db/sqlite/db";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const authState = await authUser({ email, password });
    const data = {
        success: authState.result,
        message: authState.message,
        record: authState.data ?? {},
    };
    if (!authState.result) return res.status(400).send(data);
    return res.status(200).send(data);
}

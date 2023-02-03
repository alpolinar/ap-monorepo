import { NextApiRequest, NextApiResponse } from "next";
import { migration } from "../../../db/sqlite/db";

export default async function runMigration(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await migration();
    return res.status(200).send("migration done");
}

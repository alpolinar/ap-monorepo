import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/db/sqlite/db";
import { UserRole } from "@/db/sqlite/db-types";

export default async function createCustomer(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password, name } = req.body;

    const role = UserRole.CUSTOMER;
    const result = await createUser({ email, password, name, role });
    if (!result)
        return res.status(400).send("I don't know what happened. Sorry!");
    return res.status(200).send({ email, password, name });
}

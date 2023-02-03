import { NextApiRequest, NextApiResponse } from "next";
import { dummyCreateCategories } from "../../../db/sqlite/db";

export default async function dummyProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dummyCreateCategories();
        return res.status(200).send("create dummy category");
    } catch (error) {
        return res.status(500).send("Something went wrong!");
    }
}

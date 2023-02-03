import { NextApiRequest, NextApiResponse } from "next";
import { dummyCreateProducts } from "../../../db/sqlite/db";
import { throws } from "assert";

export default async function dummyProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dummyCreateProducts();
        return res.status(200).send("create dummy products");
    } catch (error) {
        return res.status(500).send("Something went wrong!");
    }
}

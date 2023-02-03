import { NextApiRequest, NextApiResponse } from "next";
import { getProductWithId } from "../../../db/sqlite/db";

export default async function allProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.body;
    try {
        const result = await getProductWithId(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Something went wrong!");
    }
}

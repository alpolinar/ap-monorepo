import { NextApiRequest, NextApiResponse } from "next";
import { submitOrder } from "../../../db/sqlite/db";

export default async function allProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId, products } = req.body;
        const result = await submitOrder({ userId, products });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
    return res.status(400).send(false);
}

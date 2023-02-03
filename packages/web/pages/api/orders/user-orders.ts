import { NextApiRequest, NextApiResponse } from "next";
import { fetchUserOrders } from "../../../db/sqlite/db";

export default async function allProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.body;
        const result = await fetchUserOrders(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
    return res.status(400).send(false);
}

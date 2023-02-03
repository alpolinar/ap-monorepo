import { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts } from "../../../db/sqlite/db";

export default async function allProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const result = await getAllProducts();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Something went wrong!");
    }
}

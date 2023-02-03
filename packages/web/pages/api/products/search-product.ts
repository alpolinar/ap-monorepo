import { NextApiRequest, NextApiResponse } from "next";
import { searchProduct } from "../../../db/sqlite/db";

export default async function allProducts(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("API");
    try {
        const { keyword } = req.body;
        const result = await searchProduct(keyword);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Something went wrong!");
    }
}

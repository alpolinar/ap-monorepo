import axios from "axios";

export async function authRefresh(token: string | null | undefined) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/users/auth-refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const { id, name, email, role } = response.data.record;
    return { id, name, email, role };
}

export async function fetchProducts(): Promise<any> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/products`
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error };
    }
}

export async function getProduct(id: string): Promise<any> {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/products/get-product-with-id`,
            { id }
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error };
    }
}

export async function searchProduct(keyword: string | string[] | undefined) {
    console.log("fetchings");
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/products/search-product`,
            {
                keyword,
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return { error };
    }
}

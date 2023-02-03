export enum UserRole {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
}

export type User = {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
};

export type UserAuth = {
    email: string;
    password: string;
};

export type Product = {
    name: string;
    categories: Array<number>;
    image: string;
};

export type Category = {
    name: string;
    slug: string;
};

export type ProductCategories = {
    productId: string;
    categories: Array<number>;
};

export type ProductData = {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
};

export type QueryProduct = {
    query?: string;
};

export type ProductOrder = {
    id: string;
    userId: string;
    products: string;
};

export type UserOrders = {
    orders: ProductOrder & { id: string }[];
};

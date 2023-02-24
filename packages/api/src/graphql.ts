
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateProductInput {
    name: string;
    image: string;
    description: string;
    price: number;
    inventory: number;
}

export interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    inventory: number;
}

export interface ProductDelete {
    status: string;
}

export interface IQuery {
    fetchProducts(): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;
    fetchProductById(id: string): Nullable<Product> | Promise<Nullable<Product>>;
    fetchProductByKeyword(name: string): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;
}

export interface IMutation {
    createProduct(input: CreateProductInput): Product | Promise<Product>;
    deleteProduct(input: string): ProductDelete | Promise<ProductDelete>;
    updateProduct(id: string, input: CreateProductInput): Product | Promise<Product>;
}

type Nullable<T> = T | null;

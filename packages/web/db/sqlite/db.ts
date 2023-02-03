import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { hash, compare } from "bcrypt";
import {
    Product,
    ProductCategories,
    ProductOrder,
    User,
    UserAuth,
    UserRole,
} from "./db-types";
import { randomUUID } from "crypto";

//  #####   #####  #
// #     # #     # #       # ##### ######
// #       #     # #       #   #   #
//  #####  #     # #       #   #   #####
//       # #   # # #       #   #   #
// #     # #    #  #       #   #   #
//  #####   #### # ####### #   #   ######

// ###
//  #  #    # ##### ###### #####  ######   ##    ####  ######
//  #  ##   #   #   #      #    # #       #  #  #    # #
//  #  # #  #   #   #####  #    # #####  #    # #      #####
//  #  #  # #   #   #      #####  #      ###### #      #
//  #  #   ##   #   #      #   #  #      #    # #    # #
// ### #    #   #   ###### #    # #      #    #  ####  ######

export async function migration(): Promise<void> {
    const db = await dbOpen();
    await db.migrate({
        migrationsPath: "./db/sqlite/migrations",
    });
    db.close();
}

export async function dbOpen(): Promise<
    Database<sqlite3.Database, sqlite3.Statement>
> {
    return await open({
        filename: "./db/sqlite/awesome-e-comm.db",
        driver: sqlite3.Database,
    });
}

// ######
// #     #   ##    ####   ####  #    #  ####  #####  #####
// #     #  #  #  #      #      #    # #    # #    # #    #
// ######  #    #  ####   ####  #    # #    # #    # #    #
// #       ######      #      # # ## # #    # #####  #    #
// #       #    # #    # #    # ##  ## #    # #   #  #    #
// #       #    #  ####   ####  #    #  ####  #    # #####

// #     #
// ##   ##   ##   #    #   ##    ####  ###### #    # ###### #    # #####
// # # # #  #  #  ##   #  #  #  #    # #      ##  ## #      ##   #   #
// #  #  # #    # # #  # #    # #      #####  # ## # #####  # #  #   #
// #     # ###### #  # # ###### #  ### #      #    # #      #  # #   #
// #     # #    # #   ## #    # #    # #      #    # #      #   ##   #
// #     # #    # #    # #    #  ####  ###### #    # ###### #    #   #

async function hashPassword(password: string): Promise<string> {
    const result = await hash(password, 10);
    return result;
}

async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    const result = await compare(password, hash);
    return result;
}

// #     #
// #     #  ####  ###### #####
// #     # #      #      #    #
// #     #  ####  #####  #    #
// #     #      # #      #####
// #     # #    # #      #   #
//  #####   ####  ###### #    #

// #     #
// ##   ##   ##   #    #   ##    ####  ###### #    # ###### #    # #####
// # # # #  #  #  ##   #  #  #  #    # #      ##  ## #      ##   #   #
// #  #  # #    # # #  # #    # #      #####  # ## # #####  # #  #   #
// #     # ###### #  # # ###### #  ### #      #    # #      #  # #   #
// #     # #    # #   ## #    # #    # #      #    # #      #   ##   #
// #     # #    # #    # #    #  ####  ###### #    # ###### #    #   #

export async function createUser({
    email,
    password,
    name,
    role,
}: User): Promise<boolean> {
    try {
        const db = await dbOpen();
        const hashedPass = await hashPassword(password);
        const id = randomUUID().split("-")[0];
        const userRole = role ?? UserRole.ADMIN;
        await db.run(
            `INSERT INTO Users (id, email, password, name, role) VALUES("${id}", "${email}", "${hashedPass}", "${name}", "${userRole}")`
        );
        db.close();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function searchUser(id: string): Promise<User> {
    const db = await dbOpen();
    const result = await db.get(
        `SELECT id, name, email, role FROM Users WHERE id="${id}"`
    );
    db.close();
    return result;
}

export async function authUser({
    email,
    password,
}: UserAuth): Promise<User | any> {
    const db = await dbOpen();
    const user = await db.get(`SELECT * FROM Users where email="${email}"`);
    const result = user
        ? await comparePassword(password, user?.password)
        : false;
    db.close();
    return {
        data: {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            role: user?.role,
        },
        result,
        message: !user
            ? `No user found with the email ${email}`
            : !result
            ? "Password did not match"
            : "",
    };
}

export async function authRefresh(id: string): Promise<any> {
    const db = await dbOpen();
    const user = await db.get(`SELECT * FROM Users where id="${id}"`);
    db.close();
    return user;
}

export async function updateUser({
    id,
    name,
    email,
}: {
    id: string;
    name: string;
    email: string;
}): Promise<boolean> {
    try {
        const db = await dbOpen();
        const result = await db.run(
            `UPDATE Users SET name="${name}", email="${email}" WHERE id="${id}"`
        );
        if (result.changes) return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

// ######
// #     # #####   ####  #####  #    #  ####  #####
// #     # #    # #    # #    # #    # #    #   #
// ######  #    # #    # #    # #    # #        #
// #       #####  #    # #    # #    # #        #
// #       #   #  #    # #    # #    # #    #   #
// #       #    #  ####  #####   ####   ####    #

// #     #
// ##   ##   ##   #    #   ##    ####  ###### #    # ###### #    # #####
// # # # #  #  #  ##   #  #  #  #    # #      ##  ## #      ##   #   #
// #  #  # #    # # #  # #    # #      #####  # ## # #####  # #  #   #
// #     # ###### #  # # ###### #  ### #      #    # #      #  # #   #
// #     # #    # #   ## #    # #    # #      #    # #      #   ##   #
// #     # #    # #    # #    #  ####  ###### #    # ###### #    #   #

async function createProductCategories({
    productId,
    categories,
}: ProductCategories): Promise<boolean> {
    try {
        const db = await dbOpen();
        let insertString =
            "INSERT INTO ProductCategories (product_id, category_id) VALUES";
        categories.map((categoryId) => {
            insertString += ` ("${productId}", ${categoryId}),`;
        });
        const result = await db.run(insertString.slice(0, -1));
        db.close();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function createProduct({
    name,
    categories,
    image,
}: Product): Promise<boolean> {
    try {
        const productId = randomUUID().split("-")[0];
        const db = await dbOpen();
        await db.run(
            `INSERT INTO Products (id, name, image) VALUES("${productId}", "${name}", "${image}")`
        );
        db.close();
        const result = await createProductCategories({
            productId,
            categories,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function createCategory(name: string): Promise<boolean> {
    try {
        const slug = name.toLowerCase().split(" ").join("-");
        const db = await dbOpen();
        await db.run(
            `INSERT INTO Categories (name, slug) VALUES("${name}", "${slug}")`
        );
        db.close();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getAllProducts() {
    try {
        const db = await dbOpen();
        const result = await db.all("SELECT * FROM Products");
        db.close();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getProductWithId(id: string) {
    try {
        const db = await dbOpen();
        const result = await db.get(`SELECT * FROM Products WHERE id="${id}"`);
        db.close();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function searchProduct(keyword: string | string[] | undefined) {
    try {
        const db = await dbOpen();
        const queryString = `SELECT * FROM Products WHERE id IN (SELECT product_id  FROM ProductCategories WHERE category_id IN (SELECT id FROM Categories WHERE name LIKE "%${keyword}%")) OR name LIKE "%${keyword}%"`;
        const result = await db.all(queryString);
        db.close();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// #######
// #     # #####  #####  ###### #####
// #     # #    # #    # #      #    #
// #     # #    # #    # #####  #    #
// #     # #####  #    # #      #####
// #     # #   #  #    # #      #   #
// ####### #    # #####  ###### #    #

// #     #
// ##   ##   ##   #    #   ##    ####  ###### #    # ###### #    # #####
// # # # #  #  #  ##   #  #  #  #    # #      ##  ## #      ##   #   #
// #  #  # #    # # #  # #    # #      #####  # ## # #####  # #  #   #
// #     # ###### #  # # ###### #  ### #      #    # #      #  # #   #
// #     # #    # #   ## #    # #    # #      #    # #      #   ##   #
// #     # #    # #    # #    #  ####  ###### #    # ###### #    #   #

export async function submitOrder({
    userId,
    products,
}: ProductOrder): Promise<boolean> {
    try {
        const id = randomUUID().split("-")[0];
        const db = await dbOpen();
        await db.run(
            `INSERT INTO Orders (id, user_id, products) VALUES('${id}', '${userId}', '${products}')`
        );
        db.close();
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export async function fetchUserOrders(
    userId: string
): Promise<Omit<ProductOrder, "userId">[]> {
    try {
        const db = await dbOpen();
        const result = await db.all<Omit<ProductOrder, "userId">[]>(
            `SELECT * FROM Orders WHERE user_id="${userId}"`
        );
        db.close();
        return result;
    } catch (error) {
        console.log(error);
    }
    return [{ id: "", products: "" }];
}

// ######
// #     # #    # #    # #    # #   #
// #     # #    # ##  ## ##  ##  # #
// #     # #    # # ## # # ## #   #
// #     # #    # #    # #    #   #
// #     # #    # #    # #    #   #
// ######   ####  #    # #    #   #

// #######
// #       #    # #    #  ####  ##### #  ####  #    #  ####
// #       #    # ##   # #    #   #   # #    # ##   # #
// #####   #    # # #  # #        #   # #    # # #  #  ####
// #       #    # #  # # #        #   # #    # #  # #      #
// #       #    # #   ## #    #   #   # #    # #   ## #    #
// #        ####  #    #  ####    #   #  ####  #    #  ####

export async function dummyCreateUser(): Promise<void> {
    const users: Array<User> = [
        {
            email: "test@test.com",
            password: "password",
            name: "Test User",
            role: UserRole.CUSTOMER,
        },
        {
            email: "someuser@test.com",
            password: "someuserpass",
            name: "Some User",
            role: UserRole.CUSTOMER,
        },
        {
            email: "admin@test.com",
            password: "adminpass",
            name: "Admin User",
            role: UserRole.ADMIN,
        },
    ];
    users.map(async (user) => {
        const { email, password, name, role } = user;
        await createUser({ email, password, name, role });
    });
}

export async function dummyCreateProducts(): Promise<void> {
    const productList = [
        {
            name: "Carribean Package",
            categories: [1, 2, 3],
            image: "https://images.unsplash.com/photo-1618245318763-a15156d6b23c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        },
        {
            name: "Asia Package",
            categories: [1, 3],
            image: "https://images.unsplash.com/photo-1587381419916-78fc843a36f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        },
        {
            name: "Canada Package",
            categories: [2, 3],
            image: "https://images.unsplash.com/photo-1653189382464-25302f3e7409?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        },
    ];
    productList.map(async (product) => {
        const { name, categories, image } = product;
        await createProduct({ name, categories, image });
    });
}

export async function dummyCreateCategories(): Promise<void> {
    const categoryList: Array<string> = ["One-way", "Package", "Hotel"];
    categoryList.map(async (category) => {
        await createCategory(category);
    });
}

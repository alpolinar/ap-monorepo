-- Up
CREATE TABLE Products (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Categories (
    id INTEGER DEFAULT (0) PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL
);

CREATE TABLE ProductCategories (
    id INTEGER DEFAULT (0) PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    CONSTRAINT product_fk_product_id FOREIGN KEY (product_id)
    REFERENCES Products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT product_fk_category_id FOREIGN KEY (category_id)
    REFERENCES Categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Inventory (
    id INTEGER DEFAULT (0) PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT (0),
    CONSTRAINT product_fk_product_id FOREIGN KEY (product_id)
    REFERENCES Products(id) ON UPDATE CASCADE ON DELETE CASCADE
)

-- Down
DROP TABLE Products;
DROP TABLE Categories;
DROP TABLE ProductCategories;
DROP TABLE Inventory;
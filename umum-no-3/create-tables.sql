-- a.I
CREATE TABLE customers
(
    id integer NOT NULL,
    name character varying NOT NULL,
    PRIMARY KEY (id)
);

-- a.II
CREATE TABLE products
(
    id integer NOT NULL,
    name character varying NOT NULL,
    price double precision NOT NULL,
    PRIMARY KEY (id)
);

-- a.III
CREATE TABLE orders
(
    id integer NOT NULL,
    customer_id integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT order_customer FOREIGN KEY (customer_id)
        REFERENCES customers (id) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

-- a.IV
CREATE TABLE order_items
(
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    amount integer NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT order_item_order FOREIGN KEY (order_id)
        REFERENCES orders (id) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT order_item_product FOREIGN KEY (product_id)
        REFERENCES products (id) MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);
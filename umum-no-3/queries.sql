-- b.I
SELECT * FROM products;

-- b.II
SELECT o.id AS order_id, o.customer_id, cu.name AS customer_name, oi.product_id, pr.name AS product_name, pr.price, oi.amount FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN customers cu ON o.customer_id = cu.id
LEFT JOIN products pr ON oi.product_id = pr.id
ORDER BY order_id ASC;

-- b.III
SELECT cu.id, cu.name, SUM(pr.price * oi.amount) AS total_sales FROM customers cu
LEFT JOIN orders o ON cu.id = o.customer_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products pr ON oi.product_id = pr.id
GROUP BY cu.id
ORDER BY cu.id ASC;

-- b.IV
SELECT pr.id, pr.name, SUM(oi.amount) AS total_amount FROM products pr
LEFT JOIN order_items oi ON pr.id = oi.product_id
GROUP BY pr.id
ORDER BY total_amount DESC
LIMIT 1;
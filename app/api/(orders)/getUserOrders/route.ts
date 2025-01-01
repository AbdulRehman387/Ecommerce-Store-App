import { pool } from "@/config/dbConfig";

export async function GET(req:any){
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("userId")
    const connection = await pool.connect()
    const result = await connection.query(
        `
        SELECT
        products.id AS "productId",
        products.title,
        products.price,
        products.description,
        products.image,
        orders.status,
        orders.id AS "orderId",
        orders."orderDate",
        order_items.quantity
        FROM order_items
        JOIN products ON order_items."productId"=products.id
        JOIN orders ON order_items."orderId"=orders.id
        JOIN accounts ON orders."userId"=accounts.id
        WHERE accounts.id=$1
        `,
        [query]
    )
    return Response.json(result.rows)
}
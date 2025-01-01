import { pool } from "@/config/dbConfig";

export async function GET(req:any){
    const connection = await pool.connect()
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("userId")
    const result = await connection.query(
        `
        SELECT 
        products.id, products.title, products.price, products.image, products."category", products.description,
        order_items.quantity, orders.status
        FROM accounts
        JOIN orders ON accounts.id=orders."userId"
        JOIN order_items ON orders.id=order_items."orderId"
        JOIN products ON order_items."productId"=products.id
        WHERE accounts.id=$1
        `, [query],
    )
    return Response.json(result.rows)
}
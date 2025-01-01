import { pool } from "@/config/dbConfig";

export async function GET(req:any){
    const connection = await pool.connect()
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("orderId")
    const result = await connection.query(
        `
        SELECT 
        products.id,
        products.title,
        products.price,
        products.description,
        products.category,
        products.image,
        order_items.quantity,
        order_items."orderId"
        FROM orders
        JOIN order_items ON orders.id=order_items."orderId"
        JOIN products ON order_items."productId"=products.id
        WHERE orders.id=$1
        `,[query]
    )
    return Response.json(result.rows)
}
export const dynamic = "force-dynamic";
import { pool } from "@/config/dbConfig";

export async function POST(req:any){
    const connection = await pool.connect()
    const body = await req.json()
    const result = await connection.query(`INSERT INTO orders("userId", amount, "orderDetails") VALUES($1, $2, $3) RETURNING id`,[body.userId, body.amount, body.orderDetails])
    for (let i = 0; i < body.products.length; i++) {
        const item = body.products[i];
        const result2 = await connection.query(`INSERT INTO order_items("orderId", "productId", quantity) VALUES($1, $2, $3)`, [result.rows[0].id, item.id, item.quantity])
    }
    return Response.json({message: "success"})
}
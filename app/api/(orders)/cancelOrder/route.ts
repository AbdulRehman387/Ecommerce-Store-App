import { pool } from "@/config/dbConfig";

export async function DELETE(req: any) {
    const body = await req.json()
    const connection = await pool.connect()
    const prev = await connection.query(`SELECT * FROM order_items WHERE "orderId"=$1`, [body.orderId])
    if (!(prev.rows.length > 1)) {
        const result1 = await connection.query(`DELETE FROM order_items WHERE "orderId"=$1 AND "productId"=$2`, [body.orderId, body.productId])
        const result2 = await connection.query(`DELETE FROM orders WHERE id=$1`, [body.orderId])
        return Response.json({message: "success"})
    }
    const result = await connection.query(`DELETE FROM order_items WHERE "orderId"=$1 AND "productId"=$2`, [body.orderId, body.productId])
    return Response.json({message: "success"})
}
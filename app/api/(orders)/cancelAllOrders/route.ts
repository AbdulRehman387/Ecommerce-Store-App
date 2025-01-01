import { pool } from "@/config/dbConfig";

export async function DELETE(req: any) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("orderId")
    const connection = await pool.connect()
    const result1 = await connection.query(`DELETE FROM order_items WHERE "orderId"=$1`, [query])
    const result2 = await connection.query(`DELETE FROM orders WHERE id=$1`, [query])
    return Response.json({message: "success"})
}
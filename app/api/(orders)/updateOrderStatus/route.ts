import { pool } from "@/config/dbConfig";

export async function PUT(req:any){
    const connection = await pool.connect()
    const body = await req.json()
    const result1 = await connection.query(`UPDATE orders SET status=$1 WHERE id=$2`,[body.status,body.orderId])
    const result2 = await connection.query(
        `
        SELECT * FROM orders ORDER BY id ASC
        `
    )
    return Response.json(result2.rows)
}
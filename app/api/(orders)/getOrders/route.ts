export const dynamic = "force-dynamic";
import { pool } from "@/config/dbConfig";

export async function GET(){
    const connection = await pool.connect()
    const result = await connection.query(
        `
        SELECT * FROM orders
        `
    )
    return Response.json(result.rows)
}

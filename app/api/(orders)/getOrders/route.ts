export const dynamic = "force-dynamic";
import { pool } from "@/config/dbConfig";

export async function GET(){
    const connection = await pool.connect()
    const result = await connection.query(
        `
        SELECT * FROM orders ORDER BY id ASC
        `
    )
    return Response.json(result.rows)
}

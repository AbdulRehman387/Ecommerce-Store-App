export const dynamic = "force-dynamic";
import { pool } from "@/config/dbConfig";

export async function POST(req: any) {
    try {
        const connection = await pool.connect()
        const body = await req.json()
        const result = await connection.query(`INSERT INTO messages(name, email, contact, message) VALUES($1, $2, $3, $4)`, [body.name, body.email, body.contact, body.message])
        return Response.json({message: "success"})
    } catch (error) {
        return Response.json({ message: error })
    }
}
export async function GET(req: any) {
    try {
        const connection = await pool.connect()
        const result = await connection.query("SELECT * FROM messages ORDER BY id DESC")
        return Response.json(result.rows)
    } catch (error) {
        return Response.json({ message: error })
    }
}
export const dynamic = "force-dynamic";
import { pool } from "@/config/dbConfig";

export async function GET(req: any) {
    const connection = await pool.connect()
    const result = await connection.query("SELECT * FROM products ORDER BY id ASC")
    return Response.json(result.rows)
}

export async function POST(req: any) {
    const connection = await pool.connect()
    const body = await req.json()
    const result = await connection.query(`INSERT INTO products(title, price, description, category, image) VALUES($1, $2, $3, $4, $5) RETURNING *`, [body.title, body.price, body.description, body.category, body.image])
    console.log(result.rows);
    
    return Response.json(result.rows)
}

export async function DELETE(req: any) {
    const connection = await pool.connect()
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("productId")
    const result = await connection.query(`DELETE FROM products WHERE id=$1 RETURNING *`, [query])
    return Response.json(result.rows)
}
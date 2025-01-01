import { pool } from "@/config/dbConfig";

export async function GET(req:any){
    const connection = await pool.connect()
    const result = await connection.query(
        `
        SELECT 
        users.email,
        accounts.id, accounts."userId", accounts.username, accounts.password, accounts.provider, accounts."isAdmin", accounts.image
        FROM users
        JOIN accounts ON users.id=accounts."userId"
        `,
    )
    return Response.json(result.rows)
}
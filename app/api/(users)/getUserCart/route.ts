import { pool } from "@/config/dbConfig";

export async function GET(req:any){
    const connection = await pool.connect()
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("userId")
    const result = await connection.query(
        `
        SELECT 
        products.id, products.title, products.price, products.image, products."category", products.description
        FROM accounts
        JOIN carts ON accounts.id=carts."userId"
        JOIN cart_items ON carts.id=cart_items."cartId"
        JOIN products ON cart_items."productId"=products.id
        WHERE accounts.id=$1
        `, [query],
    )
    return Response.json(result.rows)
}
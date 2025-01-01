import { pool } from "@/config/dbConfig";

export async function POST(req: any) {
    try {
        const connection = await pool.connect()
        const body = await req.json()
        const cart = await connection.query(`SELECT id FROM carts WHERE "userId"=$1`, [body.userId])
        if (!cart.rows[0]) {
            return Response.json({ message: "cart does not exist" })
        }
        const exists = await connection.query(`SELECT * FROM cart_items WHERE "cartId"=$1 AND "productId"=$2`, [cart.rows[0].id, body.productId])
        if (exists.rows[0]) {
            return Response.json({ message: "item already added" })
        }
        const result = await connection.query(`INSERT INTO cart_items("cartId", "productId") VALUES($1, $2)`, [cart.rows[0].id, body.productId])
        return Response.json({ message: "success" })
    } catch (error) {
        return Response.json({ message: error })
    }
}
export async function GET(req: any) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("userId")
    try {
        const connection = await pool.connect()
        const result = await connection.query(
            `
            SELECT products.id, products.title, products.price, products.description, products.image, products.category FROM cart_items
            JOIN carts ON cart_items."cartId"=carts.id
            JOIN accounts ON carts."userId"=accounts.id
            JOIN products ON cart_items."productId"=products.id
            WHERE accounts.id=$1
            `, [query]
        )
        return Response.json(result.rows)
    } catch (error) {
        return Response.json({ message: error })
    }
}
export async function DELETE(req: any) {
    try {
        const connection = await pool.connect()
        const body = await req.json()
        const cart = await connection.query(`SELECT id FROM carts WHERE "userId"=$1`, [body.userId])
        if (!cart.rows[0]) {
            return Response.json({ message: "cart does not exist" })
        }
        if (body.products === "all") {
            const result = await connection.query(`DELETE FROM cart_items WHERE "cartId"=$1`, [cart.rows[0].id])
            return Response.json({ message: "success" })
        }
        const result = await connection.query(`DELETE FROM cart_items WHERE "cartId"=$1 AND "productId"=$2`, [cart.rows[0].id, body.productId])
        return Response.json({ message: "success" })
    } catch (error) {
        return Response.json({ message: error })
    }
}
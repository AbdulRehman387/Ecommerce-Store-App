import { pool } from "@/config/dbConfig"

export async function POST(req: any) {
    const connection = await pool.connect()
    const body = await req.json()
    const exists = await connection.query("SELECT * FROM users WHERE email=$1", [body.email])

    if (exists.rows[0]) {
        const accountResult = await connection.query(
            `
            SELECT users.id, accounts.provider FROM users
            JOIN accounts ON accounts."userId"=users.id
            WHERE users.email=$1
            `, [body.email]
        )
        const credentialsAccountExists = accountResult.rows.some((row:any) => row.provider === "credentials");
        if (credentialsAccountExists) {
            return Response.json({ message: "error" })
        }
        else {
            const image = `https://ui-avatars.com/api/?name=${body.username}&background=0D8ABC&color=fff`
            const result = await connection.query(`INSERT INTO accounts("userId", username, password, provider, "isAdmin", image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [exists.rows[0].id, body.username, body.password, body.provider, body.isAdmin, image])
            const result4 = await connection.query(`INSERT INTO carts("userId") VALUES($1)`, [result.rows[0].id])
            return Response.json({ message: "success" })
        }

    }
    const result1 = await connection.query(`INSERT INTO users(email) VALUES($1)`, [body.email])
    const result2 = await connection.query(`SELECT * FROM users WHERE email=$1`, [body.email])
    const image = `https://ui-avatars.com/api/?name=${body.username}&background=0D8ABC&color=fff`
    const result3 = await connection.query(`INSERT INTO accounts("userId", username, password, provider, "isAdmin", image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [result2.rows[0].id, body.username, body.password, body.provider, body.isAdmin, image])   
    const result4 = await connection.query(`INSERT INTO carts("userId") VALUES($1)`, [result3.rows[0].id])
    return Response.json({ message: "success", user: result3.rows[0] })
}
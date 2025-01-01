import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { pool } from "@/config/dbConfig"

const handler = NextAuth({
    secret: "ksdgjdjg",
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { type: "text", label: "Email" },
                password: { type: "text", label: "Password" }
            },
            async authorize(credentials) {
                const connection = await pool.connect()
                const temp = await connection.query(
                    `
                    SELECT * FROM users
                    JOIN accounts ON accounts."userId"=users.id
                    WHERE users.email=$1 AND accounts.provider=$2
                    `, [credentials.email, "credentials"]
                )
                const user = temp.rows[0]
                if (user) {
                    if (user.password === credentials.password)
                        return { email: user.email, name: user.username, isAdmin: user.isAdmin }
                }
                return null
            }
        }),
        GithubProvider({
            name: "github",
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    pages: {
        signIn: "/Login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            let connection;

            try {
                connection = await pool.connect();

                if (account.provider === "github") {
                    console.log(token, " this is the token");

                    // Check if user exists
                    const userResult = await connection.query("SELECT * FROM users WHERE email=$1", [user.email]);
                    const existingUser = userResult.rows[0];

                    if (existingUser) {
                        console.log("User exists, checking accounts...");
                        const accountResult = await connection.query(
                            `
                            SELECT users.id, accounts."isAdmin", accounts.provider FROM users
                            JOIN accounts ON accounts."userId" = users.id
                            WHERE users.email = $1
                            `,
                            [user.email]
                        );

                        const githubAccountExists = accountResult.rows.some(row => row.provider === "github");

                        if (!githubAccountExists) {
                            console.log("Adding GitHub account...");
                            const result = await connection.query(
                                `INSERT INTO accounts("userId", username, password, provider, image) VALUES($1, $2, $3, $4, $5) RETURNING *`,
                                [existingUser.id, user.name, null, account.provider, token.picture]
                            );
                            const cart = await connection.query(`INSERT INTO carts("userId") VALUES($1)`, [result.rows[0].id])
                        }
                    } else {
                        console.log("Creating new user...");
                        await connection.query(`INSERT INTO users(email) VALUES($1)`, [token.email]);
                        const newUserResult = await connection.query(`SELECT * FROM users WHERE email=$1`, [token.email]);
                        const newUser = newUserResult.rows[0];
                        const result = await connection.query(
                            `INSERT INTO accounts("userId", username, password, provider, image) VALUES($1, $2, $3, $4, $5) RETURNING *`,
                            [newUser.id, token.name, null, account.provider, token.picture]
                        );
                        const cart = await connection.query(`INSERT INTO carts("userId") VALUES($1)`, [result.rows[0].id])

                    }
                }

                if (user) {
                    let result;
                    if (account.provider === "credentials") {
                        result = await connection.query(
                            `SELECT accounts.id, accounts."isAdmin", accounts.provider FROM users
                            JOIN accounts ON accounts."userId" = users.id
                            WHERE users.email = $1 AND accounts.provider = 'credentials'`,
                            [user.email]
                        );
                    }
                    else {
                        result = await connection.query(
                            `
                            SELECT accounts.id, accounts."isAdmin", accounts.provider FROM users
                            JOIN accounts ON accounts."userId" = users.id
                            WHERE users.email = $1 AND accounts.provider = 'github'
                            `,
                            [user.email]
                        );
                    }

                    console.log("Adding additional token information...");
                    token.provider = account.provider;
                    token.isAdmin = result.rows[0]?.isAdmin;
                    token.id = result.rows[0]?.id;
                }
            } catch (error) {
                console.error("Error in jwt callback:", error);
            } finally {
                if (connection) connection.release(); // Ensure connection is released
            }

            return token;
        },

        async session({ session, token }) {
            session.user.provider = token.provider;
            session.user.isAdmin = token.isAdmin
            session.user.id = token.id
            return session;
        },
        // other callbacks...
        async redirect({ baseUrl }) {
            return baseUrl
        },
    }
})
export { handler as GET, handler as POST }
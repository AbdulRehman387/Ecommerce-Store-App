import { Pool } from 'pg'

export const pool = new Pool({
    user: 'postgres.rznqstwnzmlrjdqopwbb',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: 6543,
})
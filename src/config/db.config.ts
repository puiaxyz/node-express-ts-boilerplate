
import { Pool } from 'pg';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dbschema from '../schema/index.schema.ts';
import * as dbrelations from '../schema/relations.schema.ts'

// Optimized connection pool configuration
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 20,
    min: 5,
    connectionTimeoutMillis: 10000


});

// Pool event handlers for monitoring
pool.on('connect', () => {
    console.log('🔄 New client connected to database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
});

pool.on('remove', () => {
    console.log('🔄 Client removed from pool');
});

export const db = drizzle(pool, { schema: { ...dbschema, ...dbrelations } });

// Health check function
export async function checkDatabaseHealth() {
    try {
        const client = await pool.connect();
        await client.query('SELECT 1');
        client.release();
        return { status: 'healthy', connections: pool.totalCount };
    } catch (error) {
        return { status: 'unhealthy', error: (error as Error).message };
    }
}

// Graceful shutdown
export async function closeDatabase() {
    await pool.end();
}

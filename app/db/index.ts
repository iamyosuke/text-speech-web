import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from "./schema"   
const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set.')
}

const client = postgres(connectionString, { prepare: false })
const db = drizzle(client, { schema });

export default db;
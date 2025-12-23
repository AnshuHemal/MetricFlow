import { drizzle } from 'drizzle-orm/neon-http';

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    if (!process.env.NEON_DB_CONNECTION_STRING) {
      throw new Error('NEON_DB_CONNECTION_STRING environment variable is not set');
    }
    _db = drizzle(process.env.NEON_DB_CONNECTION_STRING);
  }
  return _db;
}

export const db = getDb();
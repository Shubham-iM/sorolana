import {Pool} from 'pg';

export const pool = new Pool({
  host: process.env.NEXT_PUBLIC_HOST,
  user: process.env.NEXT_PUBLIC_USER,
  port: process.env.NEXT_PUBLIC_PORT,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASE,
  ssl: {
    rejectUnauthorized: false // This option might be needed for self-signed certificates
  }
});

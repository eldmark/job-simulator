import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// test de conexión con retry (clave para docker)
export const connectDB = async () => {
  let retries = 5;

  while (retries) {
    try {
      await pool.query("SELECT 1");
      console.log("Database connected");
      return;
    } catch (error) {
      console.log("DB not ready, retrying...");
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  throw new Error("Database connection failed");
};

export default pool;
import pkg from "pg";
import { fileURLToPath } from "url";
import { characters } from "./characters-data.js";

const { Pool } = pkg;

export const createPool = () =>
  new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

export async function seedCharacters(pool, rows = characters) {
  for (const c of rows) {
    await pool.query(
      `
      INSERT INTO characters (name, crew, devil_fruit, bounty, height, is_alive)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [c.name, c.crew, c.devil_fruit, c.bounty, c.height, c.is_alive]
    );
  }
}

async function seed() {
  const pool = createPool();

  try {
    console.log("Seeding database...");
    await seedCharacters(pool);
    console.log(`Seed completed (${characters.length} characters)`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  seed();
}
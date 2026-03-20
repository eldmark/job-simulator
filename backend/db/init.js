import { characters } from "./characters-data.js";
import { createPool, seedCharacters } from "./seed.js";

const pool = createPool();

async function init() {
  try {
    console.log("Initializing database...");

    // Check if table is empty
    const result = await pool.query("SELECT COUNT(*) FROM characters");
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      console.log("Seeding database with sample characters...");
      await seedCharacters(pool, characters);
      console.log(`Seeded ${characters.length} characters`);
    } else {
      console.log(
        `Database already contains ${count} characters, skipping seed`
      );
    }

    await pool.end();
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Database initialization error:", error);
    try {
      await pool.end();
    } catch (closeError) {
      console.error("Database pool close error:", closeError);
    }
    process.exitCode = 1;
  }
}

init();

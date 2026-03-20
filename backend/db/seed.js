import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const characters = [
  {
    name: "Monkey D. Luffy",
    crew: "Straw Hat",
    devil_fruit: "Hito Hito no Mi, Model: Nika",
    bounty: 3000000000,
    height: 1.74,
    is_alive: true,
  },
  {
    name: "Roronoa Zoro",
    crew: "Straw Hat",
    devil_fruit: "None",
    bounty: 1111000000,
    height: 1.81,
    is_alive: true,
  },
  {
    name: "Nami",
    crew: "Straw Hat",
    devil_fruit: "None",
    bounty: 366000000,
    height: 1.70,
    is_alive: true,
  },
  {
    name: "Portgas D. Ace",
    crew: "Whitebeard",
    devil_fruit: "Mera Mera no Mi",
    bounty: 550000000,
    height: 1.85,
    is_alive: false,
  },
  {
    name: "Kaido",
    crew: "Beasts Pirates",
    devil_fruit: "Uo Uo no Mi, Model: Seiryu",
    bounty: 4611100000,
    height: 7.10,
    is_alive: false,
  },
];

async function seed() {
  try {
    console.log("Seeding database...");

    for (const c of characters) {
      await pool.query(
        `
        INSERT INTO characters (name, crew, devil_fruit, bounty, height, is_alive)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [c.name, c.crew, c.devil_fruit, c.bounty, c.height, c.is_alive]
      );
    }

    console.log("Seed completed");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
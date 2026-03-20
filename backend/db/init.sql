CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    crew TEXT NOT NULL,
    devil_fruit TEXT NOT NULL,
    bounty INTEGER NOT NULL,
    height REAL NOT NULL,
    is_alive BOOLEAN NOT NULL
);
import pool from "../config/db.js";

export const getAll = async () => {
  const result = await pool.query("SELECT * FROM characters");
  return result.rows;
};

export const getById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM characters WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const create = async (data) => {
  const { name, crew, devil_fruit, bounty, height, is_alive } = data;

  const result = await pool.query(
    `
    INSERT INTO characters (name, crew, devil_fruit, bounty, height, is_alive)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [name, crew, devil_fruit, bounty, height, is_alive]
  );

  return result.rows[0];
};

export const update = async (id, data) => {
  const { name, crew, devil_fruit, bounty, height, is_alive } = data;

  const result = await pool.query(
    `
    UPDATE characters
    SET name=$1, crew=$2, devil_fruit=$3, bounty=$4, height=$5, is_alive=$6
    WHERE id=$7
    RETURNING *
    `,
    [name, crew, devil_fruit, bounty, height, is_alive, id]
  );

  return result.rows[0];
};

export const remove = async (id) => {
  await pool.query("DELETE FROM characters WHERE id = $1", [id]);
};
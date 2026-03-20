import * as model from "../models/characters-model.js";

// helper mapping
const toDB = (body) => ({
  name: body.campo1,
  crew: body.campo2,
  devil_fruit: body.campo3,
  bounty: body.campo4,
  height: body.campo5,
  is_alive: body.campo6,
});

const toAPI = (row) => ({
  id: row.id,
  campo1: row.name,
  campo2: row.crew,
  campo3: row.devil_fruit,
  campo4: row.bounty,
  campo5: row.height,
  campo6: row.is_alive,
});

// VALIDACIÓN (obligatoria)
const validate = (body) => {
  if (
    typeof body.campo1 !== "string" ||
    typeof body.campo2 !== "string" ||
    typeof body.campo3 !== "string" ||
    typeof body.campo4 !== "number" ||
    typeof body.campo5 !== "number" ||
    typeof body.campo6 !== "boolean"
  ) {
    return false;
  }
  return true;
};

export const getAll = async (req, res) => {
  const data = await model.getAll();
  res.json(data.map(toAPI));
};

export const getById = async (req, res) => {
  const item = await model.getById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  res.json(toAPI(item));
};

export const create = async (req, res) => {
  if (!validate(req.body))
    return res.status(400).json({ error: "Invalid data" });

  const newItem = await model.create(toDB(req.body));
  res.status(201).json(toAPI(newItem));
};

export const update = async (req, res) => {
  if (!validate(req.body))
    return res.status(400).json({ error: "Invalid data" });

  const updated = await model.update(req.params.id, toDB(req.body));
  if (!updated) return res.status(404).json({ error: "Not found" });

  res.json(toAPI(updated));
};

export const patch = async (req, res) => {
  const existing = await model.getById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Not found" });

  const merged = {
    campo1: req.body.campo1 ?? existing.name,
    campo2: req.body.campo2 ?? existing.crew,
    campo3: req.body.campo3 ?? existing.devil_fruit,
    campo4: req.body.campo4 ?? existing.bounty,
    campo5: req.body.campo5 ?? existing.height,
    campo6: req.body.campo6 ?? existing.is_alive,
  };

  if (!validate(merged))
    return res.status(400).json({ error: "Invalid data" });

  const updated = await model.update(req.params.id, toDB(merged));
  res.json(toAPI(updated));
};

export const remove = async (req, res) => {
  const existing = await model.getById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Not found" });

  await model.remove(req.params.id);
  res.status(204).send();
};
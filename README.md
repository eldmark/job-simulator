# One Piece Characters - Job Simulator

Full-stack CRUD app with a Node.js + Express API, PostgreSQL database, and static frontend.

The API follows the assignment contract (`campo1..campo6`) while internally storing semantic character fields (`name`, `crew`, `devil_fruit`, `bounty`, `height`, `is_alive`).

## Tech Stack

- Backend: Node.js, Express
- Database: PostgreSQL 15
- Frontend: Static HTML/CSS/JS served by Nginx
- Orchestration: Docker Compose

## Repository Structure

```text
.
├── backend/
│   ├── db/
│   │   ├── characters-data.js
│   │   ├── init.js
│   │   └── seed.js
│   ├── src/
│   │   ├── app.js
│   │   ├── config/db.js
│   │   ├── controllers/characters-controller.js
│   │   ├── models/characters-model.js
│   │   └── routes/character-routes.js
│   └── package.json
├── db/
│   └── init.sql
├── frontend/
│   └── public/
├── docker-compose.yml
└── .env.example
```

## Quick Start (Docker)

1. Create your environment file:

```bash
cp .env.example .env
```

2. Fill `.env` with values (example):

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=onepiece
PORT=8080
```

3. Start all services:

```bash
docker compose up --build
```

4. Open:

- Frontend: http://localhost:3000
- API: http://localhost:8080
- PostgreSQL exposed on host: localhost:5433

## Services

- `db`: PostgreSQL with healthcheck and schema bootstrap from `db/init.sql`
- `api`: Express server on port 8080, starts only after DB is healthy
- `frontend`: Nginx serving static UI on port 3000

## Database Initialization and Seed

Startup flow:

1. PostgreSQL container runs `db/init.sql` on first DB initialization.
2. API container runs `npm run init-db` before starting the server.
3. `init-db` checks `characters` count:
	 - If table is empty: inserts sample records.
	 - If not empty: skips seed to avoid duplicates.

Single source of seed data:

- `backend/db/characters-data.js`

Manual seed command:

```bash
cd backend
npm run seed
```

## Backend Scripts

From `backend/`:

- `npm run start`: run API normally
- `npm run dev`: run API with nodemon auto-reload
- `npm run init-db`: idempotent seed initialization
- `npm run seed`: force insert seed data

## API Contract

Base URL:

```text
http://localhost:8080/characters
```

Resource fields (contract):

- `id` (integer, auto-increment)
- `campo1` (string, required)
- `campo2` (string, required)
- `campo3` (string, required)
- `campo4` (integer, required)
- `campo5` (float, required)
- `campo6` (boolean, required)

Internal DB mapping:

- `campo1 -> name`
- `campo2 -> crew`
- `campo3 -> devil_fruit`
- `campo4 -> bounty`
- `campo5 -> height`
- `campo6 -> is_alive`

## Endpoints

- `GET /characters`
- `GET /characters/:id`
- `POST /characters`
- `PUT /characters/:id`
- `PATCH /characters/:id`
- `DELETE /characters/:id`

Expected behavior:

- `201` on create
- `204` on delete
- `400` on invalid payload
- `404` when record does not exist

## Example Request

```bash
curl -X POST http://localhost:8080/characters \
	-H "Content-Type: application/json" \
	-d '{
		"campo1": "Monkey D. Luffy",
		"campo2": "Straw Hat",
		"campo3": "Hito Hito no Mi, Model: Nika",
		"campo4": 3000000,
		"campo5": 1.74,
		"campo6": true
	}'
```

## Frontend Config

Configured in `frontend/public/js/config.js`:

```js
window.API_URL = "http://localhost:8080";
window.RESOURCE = "characters";
```

## Development Notes

- Backend code changes auto-restart the API (`nodemon`) when running through Docker.
- If you need a clean DB re-initialization (schema + seed), remove volumes:

```bash
docker compose down -v
docker compose up --build
```

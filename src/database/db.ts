import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve(__dirname, "data.sqlite");
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "");

const db = new Database(dbPath);

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  money INTEGER DEFAULT 100,
  badges TEXT DEFAULT '["🎖️ Iniciante"]',
  about TEXT DEFAULT 'Este usuário ainda não escreveu nada sobre si.'
)
`).run();

export default db;
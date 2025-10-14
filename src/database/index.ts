import fs from "fs";
import path from "path";

const DB_PATH = path.join(__dirname, "users.json");

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({}));
}

export function readDB() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export function writeDB(data: Record<string, any>) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

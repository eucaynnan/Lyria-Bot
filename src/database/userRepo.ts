import { readDB, writeDB } from "./index";

export interface User {
  id: string;
  money: number;
  badges: string[];
  about: string;
  lastClaim?: number; // timestamp do último resgate
}

export function getOrCreateUser(id: string): User {
  const db = readDB();
  if (!db[id]) {
    db[id] = {
      id,
      money: 0,
      badges: [],
      about: "",
      lastClaim: 0,
    };
    writeDB(db);
  }
  return db[id];
}

export function updateUser(user: User) {
  const db = readDB();
  db[user.id] = user;
  writeDB(db);
}

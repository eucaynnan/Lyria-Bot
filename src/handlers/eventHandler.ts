import { Client } from "discord.js";
import fs from "fs";
import path from "path";

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, "..", "events");

  function getAllEventFiles(dir: string, files: string[] = []): string[] {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        getAllEventFiles(path.join(dir, item.name), files);
      } else if (item.name.endsWith(".ts") || item.name.endsWith(".js")) {
        files.push(path.join(dir, item.name));
      }
    }
    return files;
  }

  const eventFiles = getAllEventFiles(eventsPath);

  for (const file of eventFiles) {
    const event = require(file);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  console.log(`✅ ${eventFiles.length} eventos carregados.`);
}

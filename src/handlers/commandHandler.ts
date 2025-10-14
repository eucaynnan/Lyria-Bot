import { Client } from "discord.js";
import fs from "fs";
import path from "path";

export async function loadCommands(client: Client & { commands?: any }) {
  const commandsPath = path.join(__dirname, "..", "commands");

  function getAllCommandFiles(dir: string, files: string[] = []): string[] {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        getAllCommandFiles(path.join(dir, item.name), files);
      } else if (item.name.endsWith(".ts") || item.name.endsWith(".js")) {
        files.push(path.join(dir, item.name));
      }
    }
    return files;
  }

  const commandFiles = getAllCommandFiles(commandsPath);

  for (const file of commandFiles) {
    const command = require(file);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`⚠️  O comando em ${file} está faltando 'data' ou 'execute'.`);
    }
  }

  console.log(`✅ ${client.commands.size} comandos carregados.`);
}

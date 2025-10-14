import { REST, Routes } from "discord.js";
import { config } from "./config";
import fs from "fs";
import path from "path";

const commands: any[] = [];
const commandsPath = path.join(__dirname, "commands");

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
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(config.token);

(async () => {
  try {
    console.log("🔄 Atualizando comandos...");
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );
    console.log(`✅ ${commands.length} comandos registrados!`);
  } catch (error) {
    console.error(error);
  }
})();
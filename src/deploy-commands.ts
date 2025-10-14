import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config(); // Carrega .env

const CLIENT_ID = process.env.CLIENT_ID!;
const TOKEN = process.env.TOKEN!;

// Função recursiva para ler comandos em subpastas
function loadCommands(dir: string): any[] {
  const commands: any[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      commands.push(...loadCommands(fullPath));
    } else if (file.endsWith(".ts") || file.endsWith(".js")) {
      const command = require(fullPath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
      }
    }
  }

  return commands;
}

// Carrega todos os comandos da pasta commands
const commandsPath = path.join(__dirname, "commands");
const commands = loadCommands(commandsPath);

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log(`🚀 Registrando ${commands.length} comandos globais...`);

    await rest.put(
      Routes.applicationCommands(CLIENT_ID), // GLOBAL
      { body: commands }
    );

    console.log("✅ Comandos globais registrados!");
  } catch (error) {
    console.error(error);
  }
})();

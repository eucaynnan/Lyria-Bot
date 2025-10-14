import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { loadCommands } from "./handlers/commandHandler";
import { loadEvents } from "./handlers/eventHandler";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as Client & { commands: Collection<string, any> };

client.commands = new Collection();

async function startBot() {
  await loadCommands(client);
  await loadEvents(client);

  client.login(process.env.DISCORD_TOKEN);
}

startBot();

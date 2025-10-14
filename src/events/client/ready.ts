import { Client } from "discord.js";

export const name = "clientReady";
export const once = true;

export async function execute(client: Client) {
  console.log(`🤖 Bot online como ${client.user?.tag}`);
}

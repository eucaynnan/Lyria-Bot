import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Responde com Pong!");

export async function execute(interaction: ChatInputCommandInteraction) {
  const sent = await interaction.reply({ content: "🏓 Ping?", fetchReply: true });
  const latency = sent.createdTimestamp - interaction.createdTimestamp;
  await interaction.editReply(`🏓 Pong! Latência: ${latency}ms`);
}

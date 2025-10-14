import { Interaction } from "discord.js";

export const name = "interactionCreate";
export const once = false;

export async function execute(interaction: Interaction, client: any) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Erro ao executar ${interaction.commandName}:`, error);
    await interaction.reply({
      content: "Ocorreu um erro ao executar esse comando.",
      ephemeral: true,
    });
  }
}

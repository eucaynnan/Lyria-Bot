import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { getOrCreateUser, updateUser } from "../../database/userRepo";

export const data = new SlashCommandBuilder()
  .setName("setabout")
  .setDescription("Define o seu 'sobre mim'")
  .addStringOption(option =>
    option.setName("texto")
      .setDescription("O texto que você quer colocar como sobre mim")
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const text = interaction.options.getString("texto", true);
  const user = getOrCreateUser(interaction.user.id);
  user.about = text;
  updateUser(user);

  await interaction.reply("✅ Seu 'sobre mim' foi atualizado!");
}

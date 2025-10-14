import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
import { getOrCreateUser } from "../../database/userRepo";
import { createProfileCard } from "../../utils/canvasProfile";

export const data = new SlashCommandBuilder()
  .setName("perfil")
  .setDescription("Mostra seu perfil completo no bot");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const user = interaction.user;
  const userData = getOrCreateUser(user.id);

  const imageBuffer = await createProfileCard(user, userData);
  const attachment = new AttachmentBuilder(imageBuffer, { name: "perfil.png" });

  await interaction.editReply({ files: [attachment] });
}

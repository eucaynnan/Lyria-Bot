import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { getOrCreateUser, updateUser } from "../../database/userRepo";

export const data = new SlashCommandBuilder()
  .setName("resgatar")
  .setDescription("Resgata coins aleatórios entre 50 e 100, a cada 24 horas");

export async function execute(interaction: ChatInputCommandInteraction) {
  const user = getOrCreateUser(interaction.user.id);

  const now = Date.now();
  const cooldown = 24 * 60 * 60 * 1000; // 24 horas em ms

  if (user.lastClaim && now - user.lastClaim < cooldown) {
    const remaining = cooldown - (now - user.lastClaim);
    const hours = Math.floor(remaining / 1000 / 60 / 60);
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    await interaction.reply(`⏳ Você já resgatou hoje! Tente novamente em ${hours}h ${minutes}m ${seconds}s.`);
    return;
  }

  const coins = Math.floor(Math.random() * 51) + 50; // 50-100
  user.money += coins;
  user.lastClaim = now;
  updateUser(user);

  await interaction.reply(`🎉 Você resgatou **${coins} coins**! 💰 Total: **${user.money} coins**`);
}

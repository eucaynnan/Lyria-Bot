import Canvas, { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "canvas";
import { User as DiscordUser } from "discord.js";
import { User } from "../database/userRepo";

const badgeMap: Record<string, string> = {
  HOUSE_BRILLIANCE: "https://i.imgur.com/VJrP6xQ.png",
  BUG_HUNTER_LEVEL_1: "https://i.imgur.com/8n4pX5a.png",
  EARLY_SUPPORTER: "https://i.imgur.com/Yw1L2Vv.png",
  VERIFIED_DEVELOPER: "https://i.imgur.com/QJfPZ6H.png",
};

export async function createProfileCard(user: DiscordUser, userData: User) {
  const width = 960;
  const height = 600;
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ===== Fundo gradiente =====
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0f2027");
  gradient.addColorStop(0.5, "#203a43");
  gradient.addColorStop(1, "#2c5364");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Overlay semi-transparente
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, width, height);

  // Box principal
  ctx.fillStyle = "rgba(30,30,30,0.85)";
  roundRect(ctx, 40, 40, width - 80, height - 80, 20);
  ctx.fill();

  // ===== Avatar circular neon =====
  const avatar = await Canvas.loadImage(user.displayAvatarURL({ extension: "png", size: 256 }));
  const avatarX = 60, avatarY = 80, avatarRadius = 120;

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, avatarX, avatarY, avatarRadius * 2, avatarRadius * 2);
  ctx.restore();

  ctx.lineWidth = 6;
  ctx.strokeStyle = "#00ffcc";
  ctx.beginPath();
  ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius, 0, Math.PI * 2);
  ctx.stroke();

  // ===== Informações verticais ao lado do avatar =====
  const infoX = avatarX + avatarRadius * 2 + 40;
  let infoY = avatarY + 20;

  ctx.font = "bold 48px Sans";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 4;
  ctx.fillText(user.username, infoX, infoY);

  ctx.font = "32px Sans";
  ctx.fillStyle = "#ffcc00";
  infoY += 60;
  const rank = Math.floor(userData.money / 100);
  ctx.fillText(`Rank: ${rank} 👥`, infoX, infoY);

  ctx.fillStyle = "#00ff99";
  infoY += 50;
  ctx.fillText(`Coins: ${userData.money} 💰`, infoX, infoY);

  ctx.fillStyle = "#ffffff";
  infoY += 50;
  ctx.fillText(`Badges: ${userData.badges.join(" ") || "Nenhuma"}`, infoX, infoY);

  ctx.shadowBlur = 0;

  // ===== Sobre mim =====
  ctx.font = "28px Sans";
  ctx.fillStyle = "#cccccc";
  const aboutText = userData.about || "Este usuário ainda não escreveu nada sobre si.";
  wrapText(ctx, aboutText, avatarX, avatarY + avatarRadius * 2 + 40, width - 120, 34);

  return canvas.toBuffer();
}

// ===== Função auxiliar para arredondar rect =====
function roundRect(ctx: NodeCanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ===== Função auxiliar wrapText =====
function wrapText(
  ctx: NodeCanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
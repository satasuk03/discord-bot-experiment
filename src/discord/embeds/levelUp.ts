import { MessageEmbed } from "discord.js";

interface CreateLevelUpEmbedParams {
  playerName: string;
  from: number;
  to: number;
  avatarURL?: string | null;
}

export const createLevelUpEmbed = (profile: CreateLevelUpEmbedParams) =>
  new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Level Up!")
    .setAuthor({
      name: `${profile.playerName}`,
      iconURL: profile.avatarURL ?? "https://i.imgur.com/AfFp7pu.png",
    })
    .setThumbnail(profile.avatarURL ?? "https://i.imgur.com/AfFp7pu.png")
    .addFields(
      {
        name: "```From Level```",
        value: `**${profile.from}**`,
      },
      {
        name: "```To Level```",
        value: `**${profile.to}**`,
      }
    )
    .setFooter({ text: "Keep growing!" });

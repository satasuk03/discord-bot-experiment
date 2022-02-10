import { MessageEmbed } from 'discord.js';
import { blueBook } from 'emojis';

interface createQuestDoneEmbedParams {
  playerName: string;
  questName: string;
  desc: string;
  message: string;
  avatarURL?: string | null;
  footer?: string;
}

export const createQuestDoneEmbed = (profile: createQuestDoneEmbedParams) => {
  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${blueBook}Quest Done!`)
    .setAuthor({
      name: `${profile.playerName}`,
      iconURL: profile.avatarURL ?? 'https://i.imgur.com/AfFp7pu.png',
    })
    .setThumbnail(profile.avatarURL ?? 'https://i.imgur.com/AfFp7pu.png')
    .addFields(
      {
        name: `\`\`\`${profile.questName}\`\`\``,
        value: `**${profile.desc}**`,
      },
      {
        name: '```Cannot complete quest```',
        value: profile.message,
      },
    )
    .setFooter({ text: 'Keep growing!' });
};

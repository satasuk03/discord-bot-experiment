import { MessageEmbed } from 'discord.js';
import { blueBook, goldBar, xpFull } from 'emojis';

interface createQuestDoneEmbedParams {
  playerName: string;
  questName: string;
  desc: string;
  itemsReceived?: string[];
  gfCoinReceived?: number;
  xpGained?: number;
  avatarURL?: string | null;
  footer?: string;
}

export const createQuestDoneEmbed = (profile: createQuestDoneEmbedParams) => {
  const xpString = profile.xpGained
    ? `+ ${profile.xpGained} ${xpFull}\n`
    : null;
  const gfCoinString = profile.gfCoinReceived
    ? `+ ${profile.gfCoinReceived} ${goldBar}\n`
    : null;

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
        name: '```You got```',
        value: `${xpString}${gfCoinString}`,
      },
    )
    .setFooter({ text: 'Keep growing!' });
};

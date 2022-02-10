import { MessageEmbed } from 'discord.js';
import { generateBar } from 'discord/messageTemplate/bar';
import { goldBar } from 'emojis';

interface CreateProfileEmbedParams {
  playerName: string;
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
  balance: number;
  nextLevelNeeded: number;
  avatarURL?: string | null;
}
export const createProfileEmbed = (profile: CreateProfileEmbedParams) =>
  new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Normie Player')
    .setAuthor({
      name: `${profile.playerName}'s profile`,
      iconURL: profile.avatarURL ?? 'https://i.imgur.com/AfFp7pu.png',
    })
    .setThumbnail(profile.avatarURL ?? 'https://i.imgur.com/AfFp7pu.png')
    .addFields(
      {
        name: '```PROGRESS```',
        value: `**Level**: ${profile.level}\n**Xp**: ${profile.xp}/${
          profile.nextLevelNeeded
        }\n${generateBar('xp', profile.xp, profile.nextLevelNeeded)}`,
      },
      {
        name: '```STATS```',
        value: `**Life**: ${profile.hp}/${profile.maxHp}\n${generateBar(
          'hp',
          profile.hp,
          profile.maxHp,
        )}\n**GF Coin**: ${profile.balance} ${goldBar}`,
      },
    );

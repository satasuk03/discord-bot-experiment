import { MessageEmbed } from 'discord.js';
import { generateBar } from 'discord/messageTemplate/bar';

interface CreateProfileEmbedParams {
  playerName: string;
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
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
        name: '**PROGRESS**',
        value: `**Level**: ${profile.level}\n**Xp**: ${generateBar(
          'xp',
          profile.xp,
          profile.nextLevelNeeded,
        )} ${profile.xp}/${profile.nextLevelNeeded}`,
      },
      {
        name: '**STATS**',
        value: `**Life**: ${generateBar('hp', profile.hp, profile.maxHp)} ${
          profile.hp
        }/${profile.maxHp}`,
      },
    );

import { Client } from 'discord.js';
import { createLevelUpEmbed } from 'discord/embeds/levelUp';
import { addXP } from 'leveling/services';

export default (client: Client): void => {
  client.on('messageCreate', async (message) => {
    if (message.channel.type === 'DM' || message.author.bot) {
      return;
    }
    const { guild, member } = message;
    if (!guild || !member) {
      return;
    }
    const { isLevelUp, from, to } = await addXP(
      member.id,
      Math.ceil(Math.random() * 10), // random exp 1 to 10
    );
    if (isLevelUp) {
      const msg = await message.channel.send({
        embeds: [
          createLevelUpEmbed({
            playerName: message.author.username,
            avatarURL: message.author.avatarURL(),
            from,
            to,
          }),
        ],
      });
      setTimeout(() => msg.delete(), 5000);
    }
    return;
  });
};

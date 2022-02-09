import { Client } from "discord.js";
import { readXpLevel, writeXpLevel } from "../database/xpDatabase";

export const calXpNeeded = (level: number) => {
  return Math.ceil(
    0.04 * Math.pow(level, 3) + 0.8 * Math.pow(level, 2) + Math.pow(2, level)
  );
};

export default (client: Client): void => {
  client.on("messageCreate", async (message) => {
    const { guild, member } = message;
    if (!guild || !member) {
      return;
    }
    const isLevelUp = await addXP(
      guild.id,
      member.id,
      Math.ceil(Math.random() * 101)
    );
    if (isLevelUp) {
      const msg = await message.channel.send(
        `${message.author.username}: Level up`
      );
      setTimeout(() => msg.delete(), 3000);
    }
    return;
  });
};

const addXP = async (guildId: string, clientId: string, xpToAdd: number) => {
  console.log(guildId, clientId, " get XP: ", xpToAdd);
  // console.log(readXp);
  const player = await readXpLevel(`${guildId}:${clientId}`);
  let xp = xpToAdd + player.xp;
  let needToLevelUp = calXpNeeded(player.level);

  let isLevelUp = false;
  while (xp >= needToLevelUp) {
    player.level += 1;
    xp -= needToLevelUp;
    await writeXpLevel(
      `${guildId}:${clientId}`,
      xp - needToLevelUp,
      player.level
    );
    console.log("level up to ", player.level);
    isLevelUp = true;
  }

  await writeXpLevel(`${guildId}:${clientId}`, xp, player.level);
  return isLevelUp;
};

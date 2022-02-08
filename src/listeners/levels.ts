import { Client } from "discord.js";
import { readXp, writeXp } from "../database/xpDatabase";

export default (client: Client): void => {
  client.on("messageCreate", async (message) => {
    const { guild, member } = message;
    if (!guild || !member) {
      return;
    }
    addXP(guild.id, member.id, 10);
    return;
  });
};

const addXP = async (guildId: string, clientId: string, xpToAdd: number) => {
  console.log(guildId, clientId, " get XP: ", xpToAdd);
  // console.log(readXp);
  const currentXp = await readXp(`${guildId}:${clientId}`);
  await writeXp(`${guildId}:${clientId}`, currentXp + xpToAdd);
};

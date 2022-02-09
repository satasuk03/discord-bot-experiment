import { Client } from "discord.js";
import { addXP } from "leveling/services";

export default (client: Client): void => {
  client.on("messageCreate", async (message) => {
    const { guild, member } = message;
    if (!guild || !member) {
      return;
    }
    const isLevelUp = await addXP(member.id, Math.ceil(Math.random() * 101));
    if (isLevelUp) {
      const msg = await message.channel.send(
        `${message.author.username}: Level up`
      );
      setTimeout(() => msg.delete(), 3000);
    }
    return;
  });
};

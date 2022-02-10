import config from "config";
import { BaseCommandInteraction, Client } from "discord.js";
import { claimDailyQuest } from "quest/daily";
import { Command } from "../Command";

export const Daily: Command = {
  name: `${config.COMMAND_PREFIX}-daily`,
  description: "Daily Quest",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    // const content = "Daily Quest Done!";

    // await interaction.followUp({
    //   ephemeral: true,
    //   content,
    // });
    if (!interaction.member) {
      await interaction.followUp({
        ephemeral: true,
        content: "You have no profile",
      });
      return;
    }
    const claimable = await claimDailyQuest(interaction.member.user.id);
    if (!claimable) {
      const content = "Cannot Claim Daily Quest!";
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return ``;
    }
  },
};

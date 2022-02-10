import config from "config";
import { BaseCommandInteraction, Client } from "discord.js";
import { createQuestDoneEmbed } from "discord/embeds/questDone";
import { claimDailyQuest, DailyQuest } from "quest/daily";
import { checkQuest, claimQuest } from "quest/services";
import { Command } from "../Command";

export const Daily: Command = {
  name: `${config.COMMAND_PREFIX}-daily`,
  description: "Daily Quest",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    if (!interaction.member) {
      await interaction.followUp({
        ephemeral: true,
        content: "You have no profile",
      });
      return;
    }

    const { claimed, error } = await claimQuest(
      DailyQuest.id,
      interaction.member.user.id
    );
    if (!claimed) {
      // TODO: create error embed
      const content = error ?? "Unhandled Error";
      await interaction.followUp({
        ephemeral: true,
        content,
      });
      return;
    }

    await interaction.followUp({
      embeds: [
        createQuestDoneEmbed({
          questName: DailyQuest.name,
          desc: DailyQuest.desc,
          playerName: interaction.user.username,
          avatarURL: interaction.user.avatarURL(),
          xpGained: DailyQuest.xpGained,
          gfCoinReceived: DailyQuest.gfCoinGained,
        }),
      ],
    });
    return;
  },
};

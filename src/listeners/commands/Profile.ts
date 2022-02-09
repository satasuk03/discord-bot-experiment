import { BaseCommandInteraction, Client } from "discord.js";
import { getPlayer } from "player/services";
import { calXpNeeded } from "leveling/services";
import { Command } from "../Command";
import { generateBar } from "../../discord/messageTemplate/bar";
import { createProfileEmbed } from "discord/embeds/profile";

export const Profile: Command = {
  name: "profile",
  description: "Returns user profile",
  type: "CHAT_INPUT",
  run: async (client: Client, interaction: BaseCommandInteraction) => {
    if (!interaction.member) {
      await interaction.followUp({
        ephemeral: true,
        content: "You have no profile",
      });
      return;
    }

    const player = await getPlayer(interaction.member.user.id);
    if (!player) {
      await interaction.followUp({
        ephemeral: true,
        content: "You have no profile",
      });
      return;
    }

    // console.log(interaction.user.avatarURL());
    await interaction.followUp({
      embeds: [
        createProfileEmbed({
          playerName: interaction.user.username,
          hp: 100,
          maxHp: 100,
          xp: player.xp,
          nextLevelNeeded: calXpNeeded(player.level),
          level: player.level,
          avatarURL: interaction.user.avatarURL(),
        }),
      ],
      ephemeral: true,
    });
  },
};

import { BaseCommandInteraction, Client } from "discord.js";
import { getPlayer } from "player/services";
import { calXpNeeded } from "leveling/services";
import { Command } from "../Command";
import { generateBar } from "../messageTemplate/bar";

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

    const content = `**RPG Profile**
guild: \t${interaction.guildId}
name: \t${interaction.user.username}
Level: \t${player.level}
XP: \t${player.xp}/${calXpNeeded(player.level)}
HP: \t${generateBar("hp", 32, 100)}
XP: \t${generateBar("xp", player.xp, calXpNeeded(player.level))}
`;

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

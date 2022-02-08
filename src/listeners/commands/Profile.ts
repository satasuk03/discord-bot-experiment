import { BaseCommandInteraction, Client } from "discord.js";
import { readXp } from "../../database/database";
import { Command } from "../Command";

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

    const content = `**RPG Profile**
guild: \t${interaction.guildId}
name: \t${interaction.user.username}
XP: \t${await readXp(`${interaction.guildId}:${interaction.member.user.id}`)}`;
    // currentXp: \t${xpDB.get(interaction.guild.id+interaction.member)}`;
    // console.log(interaction.guildId, interaction.member.user.id);
    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

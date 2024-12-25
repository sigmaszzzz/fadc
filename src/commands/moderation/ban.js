import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const ban = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ 
        content: 'You do not have permission to ban members!', 
        ephemeral: true 
      });
    }

    try {
      await interaction.guild.members.ban(target, { reason });
      await interaction.reply(`Successfully banned ${target.tag} for: ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: 'Failed to ban the user!', 
        ephemeral: true 
      });
    }
  },
};
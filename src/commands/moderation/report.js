import { SlashCommandBuilder } from 'discord.js';

export const report = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to report')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the report')
        .setRequired(true)),

  async execute(interaction) {
    const reportedUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const reporter = interaction.user;

    // You should configure this channel ID in your environment variables
    const reportChannel = interaction.guild.channels.cache.find(
      channel => channel.name === 'reports'
    );

    if (!reportChannel) {
      return interaction.reply({ 
        content: 'Could not find reports channel!', 
        ephemeral: true 
      });
    }

    await reportChannel.send({
      embeds: [{
        title: '⚠️ New Report',
        fields: [
          { name: 'Reported User', value: reportedUser.tag },
          { name: 'Reported By', value: reporter.tag },
          { name: 'Reason', value: reason }
        ],
        timestamp: new Date(),
        color: 0xFF0000
      }]
    });

    await interaction.reply({ 
      content: 'Report submitted successfully!', 
      ephemeral: true 
    });
  },
};
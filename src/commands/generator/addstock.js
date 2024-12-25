import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { addToStock } from '../../utils/stockManager.js';

export const addstock = {
  data: new SlashCommandBuilder()
    .setName('addstock')
    .setDescription('Add accounts to stock')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Type of stock to add to')
        .setRequired(true))
    .addAttachmentOption(option =>
      option
        .setName('file')
        .setDescription('Text file containing accounts (one per line)')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ 
        content: 'You do not have permission to add stock!', 
        ephemeral: true 
      });
    }

    const type = interaction.options.getString('type');
    const file = interaction.options.getAttachment('file');

    if (!file.name.endsWith('.txt')) {
      return interaction.reply({
        content: 'Please upload a .txt file!',
        ephemeral: true
      });
    }

    try {
      const response = await fetch(file.url);
      const content = await response.text();
      
      const success = await addToStock(type, content);
      if (success) {
        const accountCount = content.split('\n').filter(line => line.trim()).length;
        await interaction.reply({ 
          content: `Successfully added ${accountCount} accounts to ${type} stock!`, 
          ephemeral: true 
        });
      } else {
        await interaction.reply({ 
          content: 'Failed to add stock!', 
          ephemeral: true 
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: 'Failed to add stock!', 
        ephemeral: true 
      });
    }
  },
};
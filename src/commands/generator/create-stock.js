import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createStock } from '../../utils/stockManager.js';

export const createstock = {
  data: new SlashCommandBuilder()
    .setName('create-stock')
    .setDescription('Create a new stock type')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Type of stock to create')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ 
        content: 'You do not have permission to create stock!', 
        ephemeral: true 
      });
    }

    const type = interaction.options.getString('type');

    try {
      const success = await createStock(type);
      if (success) {
        await interaction.reply({ 
          content: `Successfully created stock type: ${type}`, 
          ephemeral: true 
        });
      } else {
        await interaction.reply({ 
          content: 'Failed to create stock!', 
          ephemeral: true 
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: 'Failed to create stock!', 
        ephemeral: true 
      });
    }
  },
};
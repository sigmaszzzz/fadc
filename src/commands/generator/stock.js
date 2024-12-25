import { SlashCommandBuilder } from 'discord.js';
import { checkStock } from '../../utils/stockManager.js';

export const stock = {
  data: new SlashCommandBuilder()
    .setName('stock')
    .setDescription('Check available stock'),

  async execute(interaction) {
    try {
      const stockInfo = await checkStock();
      
      await interaction.reply({
        embeds: [{
          title: 'Current Stock',
          fields: Object.entries(stockInfo).map(([type, count]) => ({
            name: type,
            value: `${count} accounts`,
            inline: true
          })),
          color: 0x0099FF
        }]
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: 'Failed to check stock!', 
        ephemeral: true 
      });
    }
  },
};
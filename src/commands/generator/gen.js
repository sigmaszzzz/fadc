import { SlashCommandBuilder } from 'discord.js';
import { getStock } from '../../utils/stockManager.js';

export const gen = {
  data: new SlashCommandBuilder()
    .setName('gen')
    .setDescription('Generate an account')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Type of account to generate')
        .setRequired(true)),

  async execute(interaction) {
    const type = interaction.options.getString('type');
    
    try {
      const account = await getStock(type);
      
      if (!account) {
        return interaction.reply({ 
          content: `No ${type} accounts available in stock!`, 
          ephemeral: true 
        });
      }

      // Send the account details in a DM
      await interaction.user.send({
        embeds: [{
          title: `${type} Account`,
          description: `Here is your generated account:\n\`${account}\``,
          color: 0x00FF00
        }]
      });

      await interaction.reply({ 
        content: 'Account has been sent to your DMs!', 
        ephemeral: true 
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({ 
        content: 'Failed to generate account!', 
        ephemeral: true 
      });
    }
  },
};
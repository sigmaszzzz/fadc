import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from 'dotenv';
import { registerCommands } from './commands/index.js';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  registerCommands(client);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ 
      content: 'There was an error executing this command!', 
      ephemeral: true 
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
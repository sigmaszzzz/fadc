import { ban } from './moderation/ban.js';
import { report } from './moderation/report.js';
import { gen } from './generator/gen.js';
import { stock } from './generator/stock.js';
import { addstock } from './generator/addstock.js';
import { createstock } from './generator/create-stock.js';

export const registerCommands = (client) => {
  client.commands.set(ban.data.name, ban);
  client.commands.set(report.data.name, report);
  client.commands.set(gen.data.name, gen);
  client.commands.set(stock.data.name, stock);
  client.commands.set(addstock.data.name, addstock);
  client.commands.set(createstock.data.name, createstock);
};
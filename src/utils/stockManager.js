import fs from 'fs/promises';
import path from 'path';

const STOCKS_DIR = './stocks';

// Ensure stocks directory exists
await fs.mkdir(STOCKS_DIR, { recursive: true });

export const createStock = async (type) => {
  const stockPath = path.join(STOCKS_DIR, `${type}.txt`);
  try {
    await fs.writeFile(stockPath, '');
    return true;
  } catch (error) {
    console.error('Error creating stock:', error);
    return false;
  }
};

export const addToStock = async (type, content) => {
  const stockPath = path.join(STOCKS_DIR, `${type}.txt`);
  try {
    await fs.appendFile(stockPath, content + '\n');
    return true;
  } catch (error) {
    console.error('Error adding to stock:', error);
    return false;
  }
};

export const getStock = async (type) => {
  const stockPath = path.join(STOCKS_DIR, `${type}.txt`);
  try {
    const content = await fs.readFile(stockPath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length === 0) return null;
    
    const account = lines[0];
    const newContent = lines.slice(1).join('\n');
    await fs.writeFile(stockPath, newContent);
    return account;
  } catch (error) {
    console.error('Error getting stock:', error);
    return null;
  }
};

export const checkStock = async () => {
  try {
    const files = await fs.readdir(STOCKS_DIR);
    const stockInfo = {};
    
    for (const file of files) {
      if (file.endsWith('.txt')) {
        const type = path.basename(file, '.txt');
        const content = await fs.readFile(path.join(STOCKS_DIR, file), 'utf-8');
        const count = content.split('\n').filter(line => line.trim()).length;
        stockInfo[type] = count;
      }
    }
    return stockInfo;
  } catch (error) {
    console.error('Error checking stock:', error);
    return {};
  }
};
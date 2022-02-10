import { Client, ClientOptions, Intents } from 'discord.js';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';
import config from './config';
import levels from './listeners/levels';
import { connectDB } from './db';

const token = config.DISCORD_TOKEN;

console.log('Bot is starting...');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
  ],
});

ready(client);
interactionCreate(client);
levels(client);

const bootstrap = async () => {
  try {
    await connectDB();
    client.login(token);
  } catch (e) {
    console.error(e);
  }
};

bootstrap();

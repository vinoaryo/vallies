const fs = require("fs");
const path = require("path");
const {
  Client,
  IntentsBitField,
  Collection,
  ActivityType,
  REST,
  Routes,
} = require("discord.js");
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const GUILD_ID = process.env.GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

bot.commands = new Collection();

const loadCommands = (commandsPath, category) => {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    bot.commands.set(command.name, command);
    console.log(`[${category}] command: ${command.name}`);
  }
};

async function init() {
  await bot.once("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}`);

    bot.user.setActivity("Valhalla Journey", { type: ActivityType.Watching });
    console.log("Activity set to Watching Valhalla Journey");

    // Load message commands
    loadCommands(path.join(__dirname, "commands", "misc"), "Misc");
    loadCommands(path.join(__dirname, "commands", "mod"), "Mod");

    // Set bot activity
  });

  bot.on("messageCreate", (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);

    try {
      command.execute(message, args, bot);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      message.reply("There was an error trying to execute that command!");
    }
  });

  bot.login(TOKEN);
}

module.exports = { init, bot };

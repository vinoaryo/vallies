const fs = require("fs");
const path = require("path");
const {
  Client,
  IntentsBitField,
  Collection,
  ActivityType,
} = require("discord.js");
require("dotenv").config();
const http = require("http");

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

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

bot.once("ready", () => {
  console.log(`Logged in as ${bot.user.tag}`);

  bot.user.setActivity("Valhalla Journey", { type: ActivityType.Watching });
  console.log("Activity set to Watching Valhalla Journey");

  loadCommands(path.join(__dirname, "commands", "misc"), "Misc");
  loadCommands(path.join(__dirname, "commands", "mod"), "Mod");
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

http
  .createServer((req, res) => {
    res.write("Commands List:\n\n");

    bot.commands.forEach((command) => {
      res.write(`Name: ${command.name}\n`);
      res.write(
        `Description: ${command.description || "No description provided"}\n`
      );
      res.write(`Developer Only: ${command.devOnly ? "Yes" : "No"}\n`);
      res.write(`Admin Only: ${command.adminOnly ? "Yes" : "No"}\n`);
      res.write("\n"); // Add an empty line for spacing between commands
    });

    res.end();
  })
  .listen(8080, () => {
    console.log("Server is listening on port 8080");
  });

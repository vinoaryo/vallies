const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "help",
  description: "Displays a list of all commands",
  devOnly: false,
  adminOnly: false,
  async execute(message, args, bot) {
    // Create an embed for the help message
    const embed = new EmbedBuilder()
      .setTitle("Help - List of Commands")
      .setDescription(
        `Prefix: **${process.env.PREFIX}**\nHere are all the available commands:`
      )
      .setColor("#ffd808");

    // Separate commands into General, Admin, and Dev categories
    const generalCommands = [];
    const adminCommands = [];
    const devCommands = [];

    bot.commands.forEach((command) => {
      if (command.devOnly) {
        devCommands.push(command);
      } else if (command.adminOnly) {
        adminCommands.push(command);
      } else {
        generalCommands.push(command);
      }
    });

    // Add General commands to the embed
    if (generalCommands.length > 0) {
      const generalFieldValue = generalCommands
        .map(
          (command) =>
            `**${command.name}**: ${
              command.description || "No description provided"
            }`
        )
        .join("\n");
      embed.addFields({ name: "General", value: generalFieldValue });
    }

    // Add Admin commands to the embed
    if (adminCommands.length > 0) {
      const adminFieldValue = adminCommands
        .map(
          (command) =>
            `**${command.name}**: ${
              command.description || "No description provided"
            }`
        )
        .join("\n");
      embed.addFields({ name: "Admin", value: adminFieldValue });
    }

    // Add Dev commands to the embed

    // if (devCommands.length > 0) {
    //   const devFieldValue = devCommands
    //     .map(
    //       (command) =>
    //         `**${command.name}**: ${
    //           command.description || "No description provided"
    //         }`
    //     )
    //     .join("\n");
    //   embed.addFields({ name: "Dev", value: devFieldValue });
    // }

    // Send the embed to the channel
    await message.channel.send({ embeds: [embed] });
  },
};

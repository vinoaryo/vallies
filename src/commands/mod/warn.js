const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Issues a warning to a user",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    // Check if the user has the 'MANAGE_MESSAGES' permission
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ) {
      return message.reply("You do not have permissions to warn members.");
    }

    // Get the mentioned user
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("You need to mention the user to warn them.");
    }

    // Get the reason for the warning
    const reason = args.slice(1).join(" ") || "No reason provided";

    // Send the warning message to a specific channel
    const logChannel = bot.channels.cache.get("1250065419503534110");
    if (logChannel) {
      logChannel.send(
        `<@${user.id}> has been warned by <@${message.author.id}> for **${reason}**`
      );
    } else {
      console.log("Log channel not found");
    }

    // Optionally, log the warning or take additional actions here
  },
};

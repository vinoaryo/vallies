const { PermissionsBitField } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Issues a warning to a user",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    // Check if the member has the required roles
    const ownerRoleID = "1231564557462409257"; // Owner role ID
    const adminRoleID = "1231555407000895489"; // Admin role ID

    // Check if the member has either the owner role or the admin role
    if (
      !message.member.roles.cache.has(ownerRoleID) &&
      !message.member.roles.cache.has(adminRoleID)
    ) {
      return message.reply("You can't execute that command!");
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

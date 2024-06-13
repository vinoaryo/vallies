module.exports = {
  name: "slowmode",
  description: "Sets a slow mode in a channel",
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

    const time = parseInt(args[0]);
    if (isNaN(time) || time < 0) {
      return message.reply("You need to specify a valid time in seconds.");
    }

    try {
      await message.channel.setRateLimitPerUser(time);
      message.reply(`Slow mode is now set to ${time} seconds.`);
    } catch (error) {
      console.error(error);
      message.reply("I was unable to set slow mode.");
    }
  },
};

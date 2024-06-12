module.exports = {
  name: "slowmode",
  description: "Sets a slow mode in a channel",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.reply("You do not have permissions to set slow mode.");
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

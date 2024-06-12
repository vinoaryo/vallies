module.exports = {
  name: "lock",
  description: "Locks a channel, preventing users from sending messages",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.reply("You do not have permissions to lock channels.");
    }

    const channel = message.mentions.channels.first() || message.channel;
    try {
      await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
      message.reply(`${channel.name} has been locked.`);
    } catch (error) {
      console.error(error);
      message.reply("I was unable to lock the channel.");
    }
  },
};

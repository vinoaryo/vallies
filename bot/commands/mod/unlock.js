module.exports = {
  name: "unlock",
  description: "Unlocks a previously locked channel",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.reply("You do not have permissions to unlock channels.");
    }

    const channel = message.mentions.channels.first() || message.channel;
    try {
      await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        SEND_MESSAGES: true,
      });
      message.reply(`${channel.name} has been unlocked.`);
    } catch (error) {
      console.error(error);
      message.reply("I was unable to unlock the channel.");
    }
  },
};

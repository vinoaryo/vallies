module.exports = {
  name: "unlock",
  description: "Unlocks a previously locked channel",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    // Check if the member has the required roles
    const ownerRoleID = "1231564557462409257"; // Owner role ID
    const adminRoleID = "1231555407000895489"; // Admin role ID
    const everyoneRoleID = "1231555202515996724"; // Default role for everyone

    // Check if the member has either the owner role or the admin role
    if (
      !message.member.roles.cache.has(ownerRoleID) &&
      !message.member.roles.cache.has(adminRoleID)
    ) {
      return message.reply("You can't execute that command!");
    }

    const channel = message.mentions.channels.first() || message.channel;
    try {
      // Lock the channel by denying send message permission to @everyone
      await channel.permissionOverwrites.edit(everyoneRoleID, {
        SendMessages: true,
      });
      message.reply(`${channel.name} has been locked.`);
    } catch (error) {
      console.error(error);
      message.reply("I was unable to lock the channel.");
    }
  },
};

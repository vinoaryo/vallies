module.exports = {
  name: "unmute",
  description: "Unmutes a user in the server",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MUTE_MEMBERS")) {
      return message.reply("You do not have permissions to unmute members.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("You need to mention the user to unmute them.");
    }

    const member = message.guild.members.resolve(user);
    if (member) {
      const muteRole = message.guild.roles.cache.find(
        (role) => role.name === "Muted"
      );
      if (!muteRole) {
        return message.reply(
          "Mute role not found. Please create a 'Muted' role."
        );
      }

      try {
        await member.roles.remove(muteRole);
        message.reply(`${user.tag} has been unmuted.`);
      } catch (error) {
        console.error(error);
        message.reply("I was unable to unmute the member.");
      }
    } else {
      message.reply("That user isn't in this server.");
    }
  },
};

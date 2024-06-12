module.exports = {
  name: "mute",
  description: "Mutes a user in the server",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MUTE_MEMBERS")) {
      return message.reply("You do not have permissions to mute members.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("You need to mention the user to mute them.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided";
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
        await member.roles.add(muteRole, reason);
        message.reply(`${user.tag} has been muted for: ${reason}`);
      } catch (error) {
        console.error(error);
        message.reply("I was unable to mute the member.");
      }
    } else {
      message.reply("That user isn't in this server.");
    }
  },
};

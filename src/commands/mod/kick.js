module.exports = {
  name: "ban",
  description: "Bans a user from the server",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply("You do not have permissions to ban members.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("You need to mention the user to ban them.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided";
    const member = message.guild.members.resolve(user);

    if (member) {
      try {
        await member.ban({ reason });
        message.reply(`${user.tag} has been banned for: ${reason}`);
      } catch (error) {
        console.error(error);
        message.reply("I was unable to ban the member.");
      }
    } else {
      message.reply("That user isn't in this server.");
    }
  },
};

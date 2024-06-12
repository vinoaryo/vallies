module.exports = {
  name: "unban",
  description: "Unbans a user from the server",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply("You do not have permissions to unban members.");
    }

    const userId = args[0];
    if (!userId) {
      return message.reply(
        "You need to provide the ID of the user to unban them."
      );
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    try {
      await message.guild.bans.remove(userId, reason);
      message.reply(`User with ID ${userId} has been unbanned for: ${reason}`);
    } catch (error) {
      console.error(error);
      message.reply(
        "I was unable to unban the member. They might not be banned or the ID is incorrect."
      );
    }
  },
};

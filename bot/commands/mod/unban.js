module.exports = {
  name: "unban",
  description: "Unbans a user from the server",
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

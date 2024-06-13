module.exports = {
  name: "ban",
  description: "Bans a user from the server",
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

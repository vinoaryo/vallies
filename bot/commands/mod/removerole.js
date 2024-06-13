module.exports = {
  name: "removerole",
  description: "Removes a role from a user",
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
    const role = message.mentions.roles.first();

    if (!user || !role) {
      return message.reply("You need to mention both the user and the role.");
    }

    const member = message.guild.members.resolve(user);

    if (member) {
      try {
        await member.roles.remove(role);
        message.reply(`${role.name} role has been removed from ${user.tag}.`);
      } catch (error) {
        console.error(error);
        message.reply("I was unable to remove the role from the member.");
      }
    } else {
      message.reply("That user isn't in this server.");
    }
  },
};

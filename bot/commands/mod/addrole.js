module.exports = {
  name: "addrole",
  description: "Adds a role to a user",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.reply("You do not have permissions to manage roles.");
    }

    const user = message.mentions.users.first();
    const role = message.mentions.roles.first();

    if (!user || !role) {
      return message.reply("You need to mention both the user and the role.");
    }

    const member = message.guild.members.resolve(user);

    if (member) {
      try {
        await member.roles.add(role);
        message.reply(`${role.name} role has been added to ${user.tag}.`);
      } catch (error) {
        console.error(error);
        message.reply("I was unable to add the role to the member.");
      }
    } else {
      message.reply("That user isn't in this server.");
    }
  },
};

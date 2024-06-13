module.exports = {
  name: "purge",
  description: "Deletes a specified number of messages from a channel",
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

    const amount = parseInt(args[0]) + 1;
    if (isNaN(amount) || amount <= 0 || amount > 100) {
      return message.reply(
        "You need to specify a valid number of messages to delete (1-99)."
      );
    }

    try {
      // Fetch and delete the specified number of messages
      const fetched = await message.channel.messages.fetch({
        limit: amount,
      });
      await message.channel.bulkDelete(fetched, true);
    } catch (error) {
      console.error(error);
      message.reply(
        "There was an error trying to delete messages in this channel."
      );
    }
  },
};

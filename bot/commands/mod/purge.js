module.exports = {
  name: "purge",
  description: "Deletes a specified number of messages from a channel",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("You do not have permissions to delete messages.");
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.reply(
        "You need to specify a valid number of messages to delete."
      );
    }

    try {
      await message.channel.bulkDelete(amount, true);
      message
        .reply(`Deleted ${amount} messages.`)
        .then(async (msg) => setTimeout(msg.delete(), 2000));
    } catch (error) {
      console.error(error);
      message.reply(
        "There was an error trying to delete messages in this channel."
      );
    }
  },
};

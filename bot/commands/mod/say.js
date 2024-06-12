module.exports = {
  name: "say",
  description: "Make the bot say something",
  devOnly: false,
  adminOnly: true,
  async execute(message, args, bot) {
    message.channel.send(args[0]);
    await message.delete();
  },
};

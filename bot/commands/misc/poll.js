const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "poll",
  description: "Start a poll",
  devOnly: false,
  adminOnly: false,
  async execute(message, args, bot) {
    const pollQuestion = args.join(" ");
    if (!pollQuestion)
      return message.reply("Please provide a question for the poll.");

    const pollEmbed = new EmbedBuilder()
      .setTitle("📊 Poll")
      .setDescription(pollQuestion)
      .setColor("#ffa500");

    const pollMessage = await message.channel.send({ embeds: [pollEmbed] });
    await pollMessage.react("👍");
    await pollMessage.react("👎");
  },
};

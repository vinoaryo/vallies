module.exports = {
  name: "ping",
  description: "Ping command",
  devOnly: false,
  adminOnly: false,
  execute(message, args, bot) {
    if (!message.member.roles.has("Valkyrie")) {
      return message.reply("You're cant use that command!");
    }
    message.channel.send("Fetching...").then(async (msg) => {
      msg.delete();
      message.channel.send(
        `🏓 Pong! Latency is ${
          msg.createdTimestamp - message.createdTimestamp
        }ms. API Latency is ${Math.round(bot.ws.ping)}ms`
      );
    });
  },
};

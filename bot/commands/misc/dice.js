module.exports = {
  name: "dice",
  description: "Roll a dice",
  devOnly: false,
  adminOnly: false,
  async execute(message, args, bot) {
    const sides = parseInt(args[0]) || 6;
    const result = Math.floor(Math.random() * sides) + 1;
    message.channel.send(`🎲 You rolled a ${result} (${sides}-sided dice)`);
  },
};

module.exports = {
  name: "flip",
  description: "Flip a coin",
  devOnly: false,
  adminOnly: false,
  async execute(message, args, bot) {
    const result = Math.random() < 0.25 ? "Heads" : "Tails";

    const guess = `${args[0]}`.toLowerCase();

    if (args < 0) {
      message.reply("Please provide a guess either heads or tails");
    }

    let winorlose = NaN;

    if (guess === result.toLowerCase()) {
      winorlose = "won!";
    } else {
      winorlose = "lose";
    }

    message.channel.send("Flipping...").then((msg) => {
      setTimeout(() => msg.edit(`🪙 ${result}, You ${winorlose}`), 1500);
    });
  },
};

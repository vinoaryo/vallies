const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Display user avatar",
  devOnly: false,
  adminOnly: false,
  execute(message, args, bot) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new EmbedBuilder()
      .setColor("0000FF") // BLUE
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.channel.send({ embeds: [avatarEmbed] });
  },
};

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Display information about a user",
  execute(message) {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);
    const userEmbed = new EmbedBuilder()
      .setColor("0000FF") // BLUE
      .setTitle(`User Information for ${user.username}`)
      .addFields(
        { name: "Username", value: user.tag },
        { name: "User ID", value: user.id },
        { name: "Joined Server", value: member.joinedAt.toDateString() },
        { name: "Account Created", value: user.createdAt.toDateString() }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.channel.send({ embeds: [userEmbed] });
  },
};

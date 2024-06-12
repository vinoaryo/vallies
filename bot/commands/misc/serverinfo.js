const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Display information about the server",
  execute(message) {
    const { guild } = message;
    const serverEmbed = new EmbedBuilder()
      .setColor("008000") // GREEN
      .setTitle(`Server Information for ${guild.name}`)
      .addFields(
        { name: "Server Name", value: guild.name },
        { name: "Total Members", value: guild.memberCount.toString() },
        { name: "Owner", value: `<@${guild.ownerId}>` },
        { name: "Created At", value: guild.createdAt.toDateString() }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.channel.send({ embeds: [serverEmbed] });
  },
};

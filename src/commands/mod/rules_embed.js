const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rules_embed",
  description: "Send embed rules",
  devOnly: true,
  adminOnly: true,
  async execute(message, args, bot) {
    const fields = [
      {
        name: "[ 1 ] Discord ToS Compliance",
        value:
          "> All members must read and adhere to Discord's Terms of Service (ToS). Violation of Discord's terms will result in a ban from this server. This rule applies to all individuals and organizations within this server.\n> [https://discordapp.com/guidelines] \n> [https://discordapp.com/ToS] \n> [https://discordapp.com/terms]",
        inline: false,
      },
      {
        name: "[ 2 ] No Advertising or Promotion",
        value:
          "> Members are prohibited from advertising or promoting Discord server links outside of this server, engaging in any form of transaction involving goods/services, or sharing links associated with fraud/forgery/hacking/scams. Advertising inquiries should be directed to server moderators. Violations will result in verbal/written warnings or a ban.",
        inline: false,
      },
      {
        name: "[ 3 ] Respectful Conduct in Text and Voice Channels",
        value:
          "> Members must maintain respectful conduct in all text and voice channels. This includes refraining from excessive negativity, harassment, NSFW content, racist remarks, spamming, or any behavior that disrupts the server's atmosphere. Violations will result in verbal/written warnings or a ban based on clear evidence.",
        inline: false,
      },
      {
        name: "[ 4 ] Proper Bot Usage in Text Channels",
        value:
          "> Using bots outside of their designated purposes in text channels (e.g., avatar, check room, music bot, game bot) is prohibited. Violations will result in verbal/written warnings or a ban, subject to internal review.",
        inline: true,
      },
      {
        name: "TERMS & CONDITIONS",
        value:
          "1. All reports (screenshots and recordings) become the property of this server.\n2. Report any disturbances or complaints to server moderators.\n3. We welcome criticism and suggestions directly to server moderators.\n4. Violators of server rules will face social sanctions according to the severity of the offense.\n5. Staff members have the authority to enforce rules and take actions, including breaking the rules if necessary, to maintain the server's integrity and safety.\n6. For assistance or inquiries, contact the server staff.\n7. Staff are authorized to enforce rules and take appropriate actions against violators. Healthy discussions are encouraged.",
        inline: false,
      },
    ];

    const titleEmbed = new EmbedBuilder()
      .setTitle("Valhalla Journey Rules")
      .setDescription(
        "Please read and understand carefully so that order on this server is always maintained."
      )
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/1548/1548205.png")
      .setColor("#ffd808");
    await message.channel.send({ embeds: [titleEmbed] });

    // Send each field as a separate embed
    for (const field of fields) {
      const embed = new EmbedBuilder()
        // .setTitle("📝 Valhalla Journey Rules")
        .addFields(field)
        .setColor("#ffd808");
      await message.channel.send({ embeds: [embed] });
    }

    // Delete the user's message
    message
      .delete()
      .catch((err) => console.error("Failed to delete the message:", err));
  },
};

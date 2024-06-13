module.exports = {
  name: "joincreate",
  description: "Join and create a temporary voice channel",
  devOnly: false,
  adminOnly: false,
  async execute(message, args, bot) {
    // Check if the user is in a voice channel
    if (!message.member.voice.channel) {
      return message.reply(
        "You need to be in a voice channel to use this command."
      );
    }

    try {
      // Create a new voice channel
      const newChannel = await message.guild.channels.create(
        `${message.author.username}'s Channel`,
        {
          type: "GUILD_VOICE",
          parent: message.member.voice.channel.parent,
          userLimit: 1, // Limit to only the user who created the channel
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: message.author.id,
              allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
            },
          ],
        }
      );

      // Join the newly created channel
      const connection = await newChannel.join();
      console.log(`Joined ${newChannel.name} in ${message.guild.name}`);
      message.channel.send(`Joined ${newChannel.name}!`);
    } catch (error) {
      console.error(`Error creating/joining voice channel: ${error}`);
      message.channel.send(
        "There was an error creating/joining the voice channel."
      );
    }
  },
};

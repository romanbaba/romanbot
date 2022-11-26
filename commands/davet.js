const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('davet')
    .setDescription("RomanBot'un davet linkini görüntülersiniz.")
    .setDMPermission(false);    

module.exports.execute = async (client, interaction, db) => {

    await interaction.deferReply();
      
     return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(":partying_face: [Beni Sunucuna Almak İçin Tıkla](https://discordapp.com/oauth2/authorize?client_id=996343874509353122&scope=bot&permissions=8) | [Destek Sunucuma Gitmek İçin Tıkla](https://discord.gg/JXttv6Z64c)")
            ], fetchReply: true });


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription("RomanBot'un gecikmesini görüntülersiniz.")
    .setDMPermission(false);

module.exports.execute = async (client, interaction, db) => {

    await interaction.deferReply();
  
    const cmdCreated = Date.now()
    const ping = client.ws.ping
    
    var status = "<:badVds:1028258104556650586>"
    
    if(ping >= 60) status = "<:ehVds:1028258105886248981>"
    if(ping >= 120) status = "<:badVds:1028258104556650586>"
    if(ping <= 30) status = "<:goodVds:1028258108469940264>"
      
     return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(status+ ' **|** Ping pong, gecikme sürelerim aşağıda yer alıyor.')
              .addFields(
                {
                  name: "Gecikme:",
                  value: "```css\n"+ping+"ms\n```",
                  inline: true
                },
                {
                  name: "Etikleşim gecikmesi:",
                  value: "```css\n"+(Date.now() - cmdCreated)+"ms\n```",
                  inline: true
                }
              ) 
            ], fetchReply: true });


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

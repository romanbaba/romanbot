const Discord = require("discord.js");
const config = require("../config.json");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('set')
    .setDescription("RomanBot'un gecikmesini görüntülersiniz.")
    .addSubcommand(subcommand =>
		subcommand
			.setName('presence')
			.setDescription("RomanBot'un durumunu güncelleyebilirsiniz.").addStringOption(op => op.setName("activity").setDescription("Hedef durum mesajını giriniz.")))
    .setDMPermission(false);

module.exports.execute = async (client, interaction, db) => {

    await interaction.deferReply();
  
     if(!config.developers.includes(interaction.user.id)) return interaction.followUp({ embeds: [new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** Bu komutu kullanmak için geliştirici iznine ihtiyacınız var.')] })

    const activity = interaction.options.getString("activity")
    
    if(!activity) {
      client.user.setPresence({ activities: [{ name: "" }], status: 'online' });
      
      return interaction.followUp({ embeds: [new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription("✅ **|** RomanBot'un durumu başarıyla `boşta` olarak ayarlandı.")] })
    } else {
      
      const msg = activity
    .replace("{usersCount}", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))
    .replace("{guildCount}", client.guilds.cache.size)
    .replace("{commandCount}", client.commands.size)
      
       client.user.setPresence({ activities: [{ name: activity }], status: 'online' });
      
      
      return interaction.followUp({ embeds: [new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription("✅ **|** RomanBot'un durumu başarıyla `"+activity+"` olarak ayarlandı.")] })
    }

};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
    developer: true
};

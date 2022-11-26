const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('istatistik')
    .setDescription("RomanBot'un sınırlı sayıdaki istatistiklerini görüntülersiniz.")
    .setDMPermission(false);    
module.exports.execute = async (client, interaction, db) => {
    
    await interaction.deferReply();
    
    const daten = Date.now()
    
    const arrayKoruma = client.guilds.cache.filter(guild => db.fetch(`korumaLog_${guild.id}`)) || 0
    const arrayCap = client.guilds.cache.filter(guild => db.fetch(`rcaptcha_${guild.id}`)) || 0
    const arraySpam = client.guilds.cache.filter(guild => db.fetch(`spamkoruması_${guild.id}`)) || 0
    
    var w = interaction.user.id === "668114927562522634" ? false : false
  
    
        function convertMS(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        return {
            d: d
            , h: h
            , m: m
            , s: s
        };
    };
  
    const row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId('gelismisbilgiler_'+interaction.user.id)
					.setLabel('Gelişmiş Bilgiler')
          .setDisabled(w)
					.setStyle(Discord.ButtonStyle.Success),
			);
  
     let u = convertMS(client.uptime);
     let uptime = u.d + " gün, " + u.h + " saat, " + u.m + " dakika, " + u.s + " saniye" 
  
    const userCommand = new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription(`• RomanBot verileri anlık olarak güncelleme gösterebilir ve tüm kullanıcı gerektiren veriler kullanıcı kimliğini açığa çıkarmaz.`)
    .addFields(
    {
      name: "• Genel veriler:",
      value: "**-** Sunucu sayısı: `"+client.guilds.cache.size+"`\n **-** Kullanıcı sayısı: `N/A`"
    },
    {
      name: "• RomanBot verileri:",
      value: "**-** Aktif kalma süresi: `"+uptime+"`\n **-** Veritabanı durumu: `Bağlı`\n **-** Komut sayısı: `"+client.commands.size+"`\n **-** RomanBot versiyonu: `"+process.env.BOT_VERSION+"`"
    },
    {
      name: "• Gecikme verileri:",
      value: "**-** Gecikme: `"+client.ws.ping+"ms`\n **-** Etkileşim gecikmesi: `"+(Date.now() - daten)+"ms`"
    },
    
    )
    
    
  return interaction.followUp({ embeds: [userCommand], components: [row] }).then(async() => {
      
    const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });
    
    collector.on('collect', async i => {
	  await i.update({ embeds: [userCommand.setColor("Green").addFields(
    {
      name: "• Güvenlik sistemleri:",
      value: "**-** Sunucu sayısı: `"+arrayKoruma.size+"`",
      inline: true
    },
    {
      name: "• rCaptcha sistemleri:",
      value: "**-** Sunucu sayısı: `"+arrayCap.size+"`",
      inline: true
    },
    {
      name: "• Spam sistemleri:",
      value: "**-** Sunucu sayısı: `"+arraySpam.size+"`",
      inline: true
    },  
    )], components: [] });
  });
    
  }); 

};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

const db = require("croxydb");
const Discord = require("discord.js");

const rp = require("../helpers/rcapchta");
module.exports = async (client, member) => {
    if(member.user.bot) return;
    
    if(db.fetch(`rcaptcha_${member.guild.id}`)) {
      
      const channel = member.guild.channels.cache.get(db.fetch(`rcaptcha_${member.guild.id}`).kanal)
      if(!channel) return;
      
      
      function randPassword(letters, numbers, either) {
      var chars = [
       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // letters
       "0123456789", // numbers
       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // either
      ];

      return [letters, numbers, either].map(function(len, i) {
        return Array(len).fill(chars[i]).map(function(x) {
          return x[Math.floor(Math.random() * x.length)];
        }).join('');
      }).concat().join('').split('').sort(function(){
        return 0.5-Math.random();
      }).join('')
    }

  const random = randPassword(3, 2, 1);
      
  const attachment = new Discord.AttachmentBuilder(rp(random), { name: `rcaptcha-${member.user.id}.png` });
  
  const row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId(`benıdogrula_${member.guild.id}${member.user.id}`)
					.setLabel("Beni Doğrula")
          .setEmoji("1026818020120723476")
					.setStyle(Discord.ButtonStyle.Secondary),
        new Discord.ButtonBuilder()
					.setCustomId(`randomGöster_${member.guild.id}${member.user.id}`)
					.setLabel("Kodu Görüntüle")
					.setStyle(Discord.ButtonStyle.Secondary),
			);    
      
  db.set(`beklenıyor_${member.guild.id}${member.user.id}`, random)
      
  return channel.send({ content: `<@${member.user.id}>`, embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true })})
              .setDescription('• Merhaba RomanBot kullanıcısı, seni sunucumuza güvenle alabilmek için altta bulunan yazıyı butona tıklayarak yazman gerekiyor.')
              .setImage("attachment://rcaptcha-"+member.user.id+".png")
              .setTimestamp()
              .setFooter({ text: member.user.username+" tarafından kullanıldı.", iconURL: member.user.displayAvatarURL({ dynamic: true })})
            ],  files: [attachment], components: [row], fetchReply: true });
    }
};

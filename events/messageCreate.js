const Discord = require("discord.js");
const cooldownedSpamUsers = new Discord.Collection();

const db = require("croxydb");

module.exports = async (client, message) => {
    if(message.author.bot) return;
    if(!message.guild) return;
  
    if(message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;
    if(message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return;
  
    if(db.fetch(`spamkoruması_${message.guild.id}`))
      {
        
       if(message.member.roles.cache.has(db.fetch(`spamkoruması_${message.guild.id}`).rol)) return;
        
        const userKey = `SpamKoruması_${message.author.id}${message.guild.id}`;
        const cooldownTime = cooldownedSpamUsers.get(userKey);
        const currentDate = parseInt(Date.now() / 1000);  
        
        if (cooldownTime) {
            const isExpired = cooldownTime <= currentDate;
            const remainingSeconds = cooldownTime - currentDate;
            if (!isExpired) {
              message.delete()
              message.member.timeout(60000 * 2)
              
              return message.channel.send({ embeds: [new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('😵‍💫 **|** Çok hızlı konuştuğun için seni iki dakikalığına susturmam gerek.')
              .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})] });
            }
        }
        
        return cooldownedSpamUsers.set(userKey,  1 + currentDate);
      }
};

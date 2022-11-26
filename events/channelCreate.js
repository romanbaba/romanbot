const db = require("croxydb");
const Discord = require("discord.js");

const { EmbedBuilder, AuditLogEvent } = require('discord.js');

const rp = require("../helpers/rcapchta");

module.exports = async (client, ban) => {
    if(db.fetch(`korumaLog_${ban.guild.id}`))
    {
      const log = ban.guild.channels.cache.get(db.fetch(`korumaLog_${ban.guild.id}`).channel)
      const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.ChannelCreate,
        });
      
      const deletionLog = fetchedLogs.entries.first();

      const { executor, target } = deletionLog;
      const mem = await ban.guild.members.cache.get(executor.id)
      
      if(mem.roles.cache.has(db.fetch(`korumaLog_${ban.guild.id}`).role)) return;
      
       var l = db.fetch(`korumaLog_${ban.guild.id}`).limit
       const userPoint = db.fetch(`userPoint_${ban.guild.id}${executor.id}`) || 0
       
       if (executor.id !== client.user.id) {
            
            if(userPoint >= l) {

                const embed = new EmbedBuilder()
                .setColor("#36393F")
                .setAuthor({ name: executor.tag, iconURL: executor.displayAvatarURL({ dynamic: true })})    
                .setDescription(`:warning: | \`${executor.tag}\` limiti aştığı için sunucudan yasaklandı. (\`${l}/${userPoint}\`)`)

                
                ban.guild.members.ban(executor.id).then(() => {
                  log.send({ embeds: [embed] })
                }).catch(() => {
                  log.send({ embeds: [embed.setDescription(`:x: | \`${executor.tag}\` yasaklanırken bir şeyler ters gitti. (\`${l}/${userPoint}\`)`)] })
                });
                db.delete(`userPoint_${ban.guild.id}${executor.id}`)

            } else {

                const embed = new EmbedBuilder()
                .setColor("#36393F")
                .setAuthor({ name: executor.tag, iconURL: executor.displayAvatarURL({ dynamic: true })})  
                .setDescription(`:warning: | \`${executor.tag}\` bir kanal oluşturdu, devam ederse onu yasaklayacağım! (\`${l}/${userPoint}\`)`)

                log.send({ embeds: [embed] })
                db.add(`userPoint_${ban.guild.id}${executor.id}`, 1)
                ban.delete()
            }

        }
    }
};

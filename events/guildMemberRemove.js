const db = require("croxydb");
const Discord = require("discord.js");

const { EmbedBuilder, AuditLogEvent } = require('discord.js');

const rp = require("../helpers/rcapchta");

module.exports = async (client, member) => {
    if(db.fetch(`rcaptcha_${member.guild.id}`)) {
    if(db.fetch(`beklenıyor_${member.guild.id}${member.user.id}`)) return db.delete(`beklenıyor_${member.guild.id}${member.user.id}`)
    if(!db.fetch(`rcaptchaOnaylılar_${member.guild.id}`)) return;  
      
     db.unpush(`rcaptchaOnaylılar_${member.guild.id}`, member.user.id)  
    }
  
    if(db.fetch(`korumaLog_${member.guild.id}`))
    {
      const log = member.guild.channels.cache.get(db.fetch(`korumaLog_${member.guild.id}`).channel)
      const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberKick,
        });
      
      const deletionLog = fetchedLogs.entries.first();

      const { executor, target } = deletionLog;
      const mem = await member.guild.members.cache.get(executor.id)
      
      if(mem.roles.cache.has(db.fetch(`korumaLog_${member.guild.id}`).role)) return;
      
       var l = db.fetch(`korumaLog_${member.guild.id}`).limit
       const userPoint = db.fetch(`userPoint_${member.guild.id}${executor.id}`) || 0
       
       if (target.id === member.id && executor.id !== client.user.id) {
            
            if(userPoint >= l) {

                const embed = new EmbedBuilder()
                .setColor("#36393F")
                .setAuthor({ name: executor.tag, iconURL: executor.displayAvatarURL({ dynamic: true })})    
                .setDescription(`:warning: | \`${executor.tag}\` limiti aştığı için sunucudan yasaklandı. (\`${l}/${userPoint}\`)`)

                
                member.guild.members.ban(executor.id).then(() => {
                  log.send({ embeds: [embed] })
                }).catch(() => {
                  log.send({ embeds: [embed.setDescription(`:x: | \`${executor.tag}\` yasaklanırken bir şeyler ters gitti. (\`${l}/${userPoint}\`)`)] })
                });
                db.delete(`userPoint_${member.guild.id}${executor.id}`)

            } else {

                const embed = new EmbedBuilder()
                .setColor("#36393F")
                .setAuthor({ name: executor.tag, iconURL: executor.displayAvatarURL({ dynamic: true })})  
                .setDescription(`:warning: | \`${executor.tag}\` birini sunucudan attı, devam ederse onu yasaklayacağım! (\`${l}/${userPoint}\`)`)

                log.send({ embeds: [embed] })
                db.add(`userPoint_${member.guild.id}${executor.id}`, 1)
            }

        }
    }
};

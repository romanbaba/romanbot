const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('güvenlik')
    .setDescription("Ekstra güvenlik yapılandırma komutlarına göz atabilirsiniz.")
    .addSubcommand(option => option.setName('ayarla').setDescription('Ekstra güvenlik yapılandırma komutlarına göz atabilirsiniz.').addChannelOption(option => option.setName('kanal').setDescription('Bir kanal giriniz.').setRequired(true)).addRoleOption(option => option.setName('muaf_rol').setDescription('Bir rol giriniz.').setRequired(true)).addIntegerOption(option => option.setName("numara").setDescription("Bir limit giriniz.").setMaxValue(10).setMinValue(1).setRequired(false)))
    .addSubcommand(option => option.setName('sıfırla').setDescription('Ayarlanmış ekstra güvenlik yapılandırma komutlarını sıfırlayabilirsiniz.'))
    .addSubcommand(option => option.setName('görüntüle').setDescription('Ekstra kurulu olan güvenlik seçenekleri görüntülersiniz.'))
    .setDefaultMemberPermissions( Discord.PermissionFlagsBits.Administrator )
    .setDMPermission(false);    

module.exports.execute = async (client, interaction, db) => {

    await interaction.deferReply()
  
   if(interaction.options.getSubcommand() === 'ayarla')
     {
    const embed5 = new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription(":x: |  Güvenlik sistemleri kanalınız yanlızca `Yazı Kanalı` olarak ayarlanmalıdır.")

    if(db.fetch(`korumaLog_${interaction.guild.id}`)) return interaction.followUp({ embeds: [
    new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription(":x: | Güvenlik sistemleri kanalı zaten <#"+db.fetch(`korumaLog_${interaction.guild.id}`).channel+"> olarak gözüküyor.")], ephemeral: true })

   if(interaction.options.getChannel("kanal").type !== 0)  return interaction.followUp({ embeds: [embed5], ephemeral: true })
      
    const embed = new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription("✅ | Güvenlik log kanalı başarıyla <#"+interaction.options.getChannel("kanal").id+"> olarak ayarlandı.")
        
    interaction.followUp({ embeds: [embed] })
    db.set(`korumaLog_${interaction.guild.id}`, { channel: interaction.options.getChannel("kanal").id, role: interaction.options.getRole("muaf_rol").id, limit: interaction.options.getInteger("numara") || 5})
     }
  
  if(interaction.options.getSubcommand() === 'sıfırla')
     {
    if(!db.fetch(`korumaLog_${interaction.guild.id}`)) return interaction.followUp({ embeds: [
    new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription(":x: | Güvenlik sistemleri zaten kaldırılmış.")], ephemeral: true })
      
    const embed = new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription("✅ | Güvenlik sistemleri başarıyla kaldırıldı.")
        
    interaction.followUp({ embeds: [embed] })
    db.delete(`korumaLog_${interaction.guild.id}`)
     }
  
  if(interaction.options.getSubcommand() === 'görüntüle')
     {
    if(!db.fetch(`korumaLog_${interaction.guild.id}`)) return interaction.followUp({ embeds: [
    new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription(":x: | Güvenlik sistemleri `pasif` iken bu işlem yapılamaz.")], ephemeral: true })
      
    const embed = new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription("✅ | Güvenlik sistemlerini kullandığın için teşekkürler.")
    .addFields(
                { name: 'Atılma güveliği:', value: '```js\ntrue\n```', inline: true },
                { name: 'Kanal güveliği:', value: '```js\ntrue\n```', inline: true },
                { name: 'Rol güveliği:', value: '```js\ntrue\n```', inline: true },
                { name: 'Yasaklama güveliği:', value: '```js\ntrue\n```', inline: true },
              )  
    
    interaction.followUp({ embeds: [embed] })
    }


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

//Ekstra güvenlik seçenkleri istiyorsanız bu komutu deneyebilir ve ekstra yapılandırma komutlarına göz atabilirsiniz.

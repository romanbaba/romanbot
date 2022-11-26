const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('spam')
    .setDescription("Sunucunuza üst düzey spam korumasını kurablilirsiniz.")
    .addSubcommand(subcommand =>
		subcommand
			.setName('ayarla')
			.setDescription('Sunucunuza üst düzey spam korumasını kurablilirsiniz.')
			.addChannelOption(option => option.setName('kanal').setDescription('Bir kanal giriniz.').setRequired(true))
      .addRoleOption(option => option.setName('rol').setDescription('Bir rol giriniz.').setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
			.setName('sıfırla')
			.setDescription('Spam koruması sistemini sunucunuzdan kaldırabilirsiniz.'))
    .addSubcommand(subcommand =>
		subcommand
			.setName('görüntüle')
			.setDescription('Spam koruması sistemini sunucunuzdan görüntüleyebilirsiniz.'))  
    .setDMPermission(false)
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator);

module.exports.execute = async (client, interaction, db) => {

    
  await interaction.deferReply()
  
  
  if(interaction.options.getSubcommand() === "ayarla")
  {
    if(db.fetch(`spamkoruması_${interaction.guild.id}`))
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** Spam koruması kanalı zaten <#'+db.fetch(`spamkoruması_${interaction.guild.id}`).kanal+'> olarak ayarlanmış.')
            ], fetchReply: true });
      }
    
    
    const channel = interaction.options.getChannel("kanal");
    const rol = interaction.options.getRole("rol");
    
    if(channel.type !== 0)
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** Spam koruması kanalınız sadece `Yazı Kanalı` olarak ayarlanmalıdır.')
            ], fetchReply: true });
      }
    
    db.set(`spamkoruması_${interaction.guild.id}`, { kanal: channel.id, rol: rol.id })
    
    return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('✅ **|** Spam koruması kanalı başarıyla <#'+channel.id+'> olarak ayarlandı.')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], fetchReply: true });
  }
  
  if(interaction.options.getSubcommand() === "sıfırla")
  {
    if(!db.fetch(`spamkoruması_${interaction.guild.id}`))
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** Spam koruması sistemi zaten kaldırılmış.')
            ], fetchReply: true });
      }
    
    
    db.delete(`spamkoruması_${interaction.guild.id}`)
    
    return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('✅ **|** Spam koruması sistemi başarıyla kaldırıldı.')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], fetchReply: true });
  }
  
  if(interaction.options.getSubcommand() === "görüntüle")
  {
    
    if(!db.fetch(`spamkoruması_${interaction.guild.id}`))
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** Spam koruması sistemi `pasif` iken bu işlem yapılamaz.')
            ], fetchReply: true });
      }
    
    const embed = new Discord.EmbedBuilder()
    .setColor("#36393F")
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription("✅ | Spam sistemlerini kullandığın için teşekkürler.")
    .addFields(
                { name: 'Mesajı sil:', value: '```js\ntrue\n```', inline: true },
                { name: 'Kullanıcıyı sustur:', value: '```js\ntrue\n```', inline: true },
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

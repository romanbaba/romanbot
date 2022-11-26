const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('rcaptcha')
    .setDescription("rCaptcha sistemini sunucunuza kurabilirsiniz.")
    .addSubcommand(subcommand =>
		subcommand
			.setName('ayarla')
			.setDescription('rCaptcha sistemini sunucunuza kurabilirsiniz.')
			.addChannelOption(option => option.setName('kanal').setDescription('Bir kanal giriniz.').setRequired(true))
      .addRoleOption(option => option.setName('rol').setDescription('Bir rol giriniz.').setRequired(true)))
    .addSubcommand(subcommand =>
		subcommand
			.setName('sıfırla')
			.setDescription('rCaptcha sistemini sunucunuzdan kaldırabilirsiniz.'))
    .addSubcommand(subcommand =>
		subcommand
			.setName('görüntüle')
			.setDescription('rCaptcha sistemini sunucunuzdan görüntüleyebilirsiniz.'))
    	.setDMPermission(false)
      .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator);

const rp = require("../helpers/rcapchta");

module.exports.execute = async (client, interaction, db) => {

  await interaction.deferReply()
  
  
  if(interaction.options.getSubcommand() === "ayarla")
  {
    if(db.fetch(`rcaptcha_${interaction.guild.id}`))
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** rCaptcha doğrulama kanalı zaten <#'+db.fetch(`rcaptcha_${interaction.guild.id}`).kanal+'> olarak ayarlanmış.')
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
              .setDescription(':x: **|** rCaptcha doğrulama kanalınız sadece `Yazı Kanalı` olarak ayarlanmalıdır.')
            ], fetchReply: true });
      }
    
    db.set(`rcaptcha_${interaction.guild.id}`, { kanal: channel.id, rol: rol.id })
    
    return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('✅ **|** rCaptcha doğrulama kanalı başarıyla <#'+channel.id+'> olarak ayarlandı.')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], fetchReply: true });
  }
  
  if(interaction.options.getSubcommand() === "sıfırla")
  {
    if(!db.fetch(`rcaptcha_${interaction.guild.id}`))
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** rCaptcha doğrulama sistemi zaten kaldırılmış.')
            ], fetchReply: true });
      }
    
    
    db.delete(`rcaptcha_${interaction.guild.id}`)
    
    return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('✅ **|** rCaptcha doğrulama sistemi başarıyla kaldırıldı.')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], fetchReply: true });
  }
  
  if(interaction.options.getSubcommand() === "görüntüle")
  {
    
    if(!`rcaptchaOnaylılar_${interaction.guild.id}`)
      {
        db.set(`rcaptchaOnaylılar_${interaction.guild.id}`, [])
      }

    
    if(!db.fetch(`rcaptcha_${interaction.guild.id}`))
      {
        return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription(':x: **|** rCaptcha doğrulama sistemi `pasif` iken bu işlem yapılamaz.')
            ], fetchReply: true });
      }
    
    const array = db.fetch(`rcaptchaOnaylılar_${interaction.guild.id}`).length || 0;
    return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setDescription('✅ **|** rCaptcha doğrulama sistemini kullandığın için teşekkürler.')
              .addFields(
                { name: 'Doğrulanmamış üyeler:', value: '```css\n'+(interaction.guild.memberCount - array)+'\n```', inline: true },
                { name: 'Doğrulanmış üyeler:', value: '```css\n'+array+'\n```', inline: true },
              )  
            ], fetchReply: true });
    
  }

};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

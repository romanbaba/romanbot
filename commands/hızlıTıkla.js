const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('hızlı')
    .setDescription("RomanBot için özenle hazırlanmış olan hızlıtıkla oynunu oynayabilirsiniz.")
    .addSubcommand(option => option.setName('tıkla').setDescription('RomanBot için özenle hazırlanmış olan hızlıtıkla oynunu oynayabilirsiniz.'))
    .setDMPermission(false);

const { fastClick } = require("../helpers/hızlıtıkla");

module.exports.execute = async (client, interaction, db) => {
   
  await interaction.deferReply();
  
  return fastClick(interaction);
  
};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

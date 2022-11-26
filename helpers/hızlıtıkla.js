const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

function fastClick(interaction) {
  const emotes = ["👆", "🍃", "💍", "🌻", "🌾", "🌼"]; 
  const emote = emotes[Math.floor(Math.random() * emotes.length)];
  
 const embed = new EmbedBuilder()
 .setColor("#36393F")
 .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})  
 .setDescription(`🧩 **|** Butona ilk tıklayan kişi kazanır.`)
  
 const id = Math.floor(Math.random() * 7);  
  
 var buton1 = true;
 var buton2 = true;
 var buton3 = true;
 var buton4 = true; 
 var buton5 = true;
 var buton6 = true;
 var buton7 = true;
 var buton8 = true; 
  
 if(id === 0) {
   buton1 = false;
 } else if(id === 1) {
   buton2 = false;
 } else if(id === 2) {
   buton3 = false;
 } else if(id === 3) {
   buton4 = false;
 } else if(id === 4) {
   buton5 = false;
 } else if(id === 5) {
   buton6 = false;
 } else if(id === 6) {
   buton7 = false;
 } else if(id === 7) {
   buton8 = false;
 }
  
const buttons = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId("taarafik")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
    
    new ButtonBuilder()
    .setCustomId("gercekbuton5")
    .setEmoji(emote)
    .setDisabled(buton5)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("sahtebuasaston18")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("gercekbuton1")
    .setEmoji(emote)
    .setDisabled(buton1)
    .setStyle(ButtonStyle.Success),
      
    );
  
    const buttons1 = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId("gercekbuton2")
    .setEmoji(emote)
    .setDisabled(buton2)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("sahtebutoqqn13")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("saht1ebutsason12")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("gercekbuton6")
    .setEmoji(emote)
    .setDisabled(buton6)
    .setStyle(ButtonStyle.Success),
     
    ); 
  
    const buttons2 = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId("sahteqbutosadn87")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("saqqhtebutqqon7a")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("gercekbuton3")
    .setEmoji(emote)
    .setDisabled(buton3)
    .setStyle(ButtonStyle.Success),
     
    new ButtonBuilder()
    .setCustomId("gercekbuton7")
    .setEmoji(emote)
    .setDisabled(buton7)
    .setStyle(ButtonStyle.Success),
      
  );
  
   const buttons3 = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId("sahtebuto1qn87")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("gercekbuton4")
    .setEmoji(emote)
    .setDisabled(buton4)
    .setStyle(ButtonStyle.Success),
      
    new ButtonBuilder()
    .setCustomId("sahteabuto1qn6a")
    .setEmoji(emote)
    .setDisabled(true)
    .setStyle(ButtonStyle.Success),
     
    new ButtonBuilder()
    .setCustomId("gercekbuton8")
    .setEmoji(emote)
    .setDisabled(buton8)
    .setStyle(ButtonStyle.Success),
      
  );
  
  setTimeout(async() => {
    interaction.deleteReply()
  }, 60000);
  
 return interaction.followUp({ embeds: [embed], components: [buttons,buttons1,buttons2, buttons3] })
  
}

module.exports = {
  fastClick
}
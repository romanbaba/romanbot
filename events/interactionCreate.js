
const Discord = require("discord.js");
const cooldownedUsers = new Discord.Collection();
const config = require("../config.json")

const db = require("croxydb");

module.exports = async (client, interaction) => {
 
    if (interaction.isChatInputCommand()) {

        const startAt = Date.now();

        if (!interaction.guild) return;

        const cmd = client.commands.get(interaction.commandName || null);

        if (!cmd) return client.functions.log("Böyle bir komut yok", "RUN_COMMAND");
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = interaction.member || await guild.members.fetch(interaction.user.id);
        if (!cmd.config.enabled) {
            return interaction.reply({ content: "Bu komut geçici olarak kullanıma kapalıdır." });
        };
      
        if(config.blacklist.includes(interaction.user.id))
          {
            await interaction.deferReply()

            
            return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true })})
              .setDescription('• Hey! orada dur bakalım, sen şuan benim kara listemde bulunuyorsun bu yüzden beni kullanamazsın.')
              .setTimestamp()
              .setFooter({ text: interaction.user.username+" tarafından kullanıldı.", iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ] });
          }
      
        if(!db.fetch(`onaylılar`).includes(interaction.user.id))
          {
            await interaction.deferReply()
            
            const row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId('rules_'+interaction.user.id)
					.setLabel('Kabul ediyorum')
                    .setEmoji("✅")
					.setStyle(Discord.ButtonStyle.Secondary),
			);
            
            return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: `${client.user.username}  - Kurallar`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
              .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
              .setDescription(`> Merhaba <@${interaction.user.id}>, **${client.user.username}** Botunun kurallar menüsüne hoş geldin.\n\n\`1)\` RomanBot üzerinde herhangi çökmelere neden olacak şekilde komutlar kullanmayın.\n\`2)\` RomanBot'un altyapısını veya benzeri bir altyapısını çıkartmayınız.\n\`3)\` RomanBot dışında 'RomanBot' adını kullanarak sahte botlara itibar etmeyiniz.\n\n\`Teşekkürler:\` RomanBot'u kullanarak bana destek olduğun için teşşekkürler. - bot geliştiricisi <33`)
              .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
              .setTimestamp()
            ], components: [row] });
          }
      
        /* if(interaction.user.id !== "668114927562522634")
          {
            await interaction.deferReply()

            
            return interaction.followUp({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true })})
              .setDescription('• RomanBot şuan geliştiricim tarafından `Güncelleme` nedeniyle bakım moduna almış, bu süre zarfınca beni kullanamazsın :(')
              .setTimestamp()
              .setFooter({ text: interaction.user.username+" tarafından kullanıldı.", iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ] });
          }
        */
        const userKey = `${interaction.user.id}${interaction.guild.id}`;
        const cooldownTime = cooldownedUsers.get(userKey);
        const currentDate = parseInt(Date.now() / 1000);
        if (cooldownTime) {
            const isExpired = cooldownTime <= currentDate;
            const remainingSeconds = cooldownTime - currentDate;
            if (!isExpired) {
                return interaction.reply({ content: `Bu komudu ${remainingSeconds} saniye sonra kullanabilirsin.` });
            }
        }


        try {
            cmd.execute(interaction.client, interaction, db);
            cooldownedUsers.set(userKey, 5 + currentDate);
        } catch {
            return client.functions.log("Komut hatası", "RUN_COMMAND");
        };
    };
    
    if(interaction.isButton())
      {
         if (!interaction.guild) return;
        
        if(interaction.customId === "gercekbuton1") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        if(interaction.customId === "gercekbuton2") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        
        if(interaction.customId === "gercekbuton3") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        
        if(interaction.customId === "gercekbuton4") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        
        if(interaction.customId === "gercekbuton5") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
  
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        
        if(interaction.customId === "gercekbuton6") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        
        if(interaction.customId === "gercekbuton7") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        if(interaction.customId === "gercekbuton8") {
     
        const randomRbc = Math.floor(Math.random() * 5) + 1; 
        
       
          
       return interaction.update({ embeds: [ new Discord.EmbedBuilder().setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}).setColor("#36393F").setDescription("✅ **|** En hızlı tıklayan siz oldunuz, tebrikler!")], components: [] })
        
      }
        
        if(interaction.customId === `benıdogrula_${interaction.guild.id}${interaction.user.id}`)
          {
            const modal = new Discord.ModalBuilder()
        .setCustomId('rcaptcha')
        .setTitle('Doğrulama Sekmesi');

        const rcaptchaInput = new Discord.TextInputBuilder()
        .setCustomId('rcaptchaInput')
        .setLabel("Doğrulama Kodunuz nedir?")
        .setMaxLength(6)
        .setMinLength(6)
        .setRequired(true)  
        .setStyle(Discord.TextInputStyle.Short);

    
        const firstActionRow = new Discord.ActionRowBuilder().addComponents(rcaptchaInput);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
          }
        
        if(interaction.customId === `randomGöster_${interaction.guild.id}${interaction.user.id}`)
          {
            return interaction.reply({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('💮 **|** Kodun: `'+db.fetch(`beklenıyor_${interaction.guild.id}${interaction.user.id}`)+'`')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], ephemeral: true })
          }
        
        if(interaction.customId === 'rules_'+interaction.user.id) {

            const embed = new Discord.EmbedBuilder()
            .setColor("#36393F")
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})  
            .setDescription(`🍰 **|** Kuralları kabul ettiğin için teşekkürler, \`${client.commands.size}\` etkileşim komutum ile hizmet vermeye hazırım.`) 
            
            db.push(`onaylılar`, interaction.user.id) 

           return interaction.update({ embeds: [embed], components: [] })         

        }
        
        }
  
  if (interaction.isModalSubmit())
    {
      if (!interaction.guild) return;
      if (interaction.customId === 'rcaptcha') {
	      
        const code = interaction.fields.getTextInputValue('rcaptchaInput');
        
        if(code === db.fetch(`beklenıyor_${interaction.guild.id}${interaction.user.id}`))
          {
            if(!db.fetch(`rcaptchaOnaylılar_${interaction.guild.id}`))
              {
                db.set(`rcaptchaOnaylılar_${interaction.guild.id}`, [])
              }
            
            interaction.member.roles.add(db.fetch(`rcaptcha_${interaction.guild.id}`).rol)
            db.delete(`beklenıyor_${interaction.guild.id}${interaction.user.id}`)
            db.push(`rcaptchaOnaylılar_${interaction.guild.id}`, interaction.user.id)
            
            return interaction.update({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription('✅ **|** Tebrikler, doğrulama sistemini başarıyla geçtiniz.')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], files: [], components: [] })
          }
          else
            {
              return interaction.reply({ embeds: [
              new Discord.EmbedBuilder()
              .setColor("#36393F")
              .setDescription(':x: **|** Yanlış kod, tekrar deneyiniz.')
              .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            ], ephemeral: true })
            }
      }
    }
        

};

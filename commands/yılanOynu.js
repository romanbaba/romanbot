const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('snake')
    .setDescription("RomanBot için özenle hazırlanmış olan yılan oynunu oynayabilirsiniz.")
    .addSubcommand(option => option.setName('game').setDescription('RomanBot için özenle hazırlanmış olan yılan oynunu oynayabilirsiniz.'))
    .setDMPermission(false);

const  SnakeGame  = require('../helpers/snakeGame')

module.exports.execute = async (client, interaction, db) => {
    new SnakeGame({
        message: interaction,
        slash_command: true,
        snake: { head: '🟢', body: '🟩', tail: '🟢' },
        emojis: {
          board: '⬛',
          food: '🍎',
          up: '⬆️',
          right: '➡️',
          down: '⬇️',
          left: '⬅️',
        },
        othersMessage: 'Butonları kullanmak için oyunu sen başlatmalısın.',
      }).startGame();
  
};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};

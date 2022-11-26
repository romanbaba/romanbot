const db = require("croxydb");

module.exports = async (client) => {
  
    client.user.setPresence({ activities: [{ name: '/yardım | kralserver.com' }], status: 'online' });
  
    client.functions.log("Bot giriş yaptı.", "READY");
    let usersCountjust = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    let users2Count = client.users.cache.size;
    let guild = client.guilds.cache.size;
    let role = client.guilds.cache.reduce((a, b) => a + b.roles.cache.size, 0)
    client.functions.log(`Kullanıcı: [${usersCountjust}]`, "READY");
    client.functions.log(`Kullanıcı: [${users2Count}]`, "READY");
    client.functions.log(`Sunucu: [${guild}]`, "READY")
  
  
    setInterval(async() => {
           client.guilds.cache.forEach(a => {
              a.members.cache.forEach(b => {
                const userDb = db.fetch(`userPoint_${a.id}${b.user.id}`)
               if(!userDb) return;
               if(userDb <= 0) return;
                
              db.subtract(`userPoint_${a.id}${b.user.id}`, 1)
              console.log("ok")
             });
           });
    }, 600000);
  
};

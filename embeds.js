let { RichEmbed } = require("discord.js");
module.exports = function genEmbed(usertag, days, hours, Title){
    let embed = new RichEmbed()
                            .setFooter("Countdown bot by Zleet")
                            .setColor("#FF0000")
                            .setTimestamp()
                            .setTitle(Title)
                            .setDescription(`Time left - **${days} days** and **${hours} hours**`)
                            .setAuthor(`Timer started by ${usertag}`);
    return embed;

                            
};
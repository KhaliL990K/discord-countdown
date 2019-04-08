let { RichEmbed } = require("discord.js");
module.exports = function genEmbed(usertag, days, hours, minutes, Title){
    let embed = new RichEmbed()
                            .setFooter("Countdown bot by Zleet")
                            .setColor("#FF0000")
                            .setTimestamp()
                            .setTitle(Title)
                            .setDescription(`Time left - **${days} days**, ${minutes} minutes and **${hours} hours**`)
                            .setAuthor(`Timer started by ${usertag}`);
    return embed;

                            
};
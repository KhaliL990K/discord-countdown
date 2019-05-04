import { RichEmbed } from "discord.js";

// let { RichEmbed } = require("discord.js");



export default function genEmbed(usertag: string, days: number, hours: number, minutes: number, Title: string): object{
    let embed: object = new RichEmbed()
                            .setFooter("Countdown bot by Zleet")
                            .setColor("#FF0000")
                            .setTimestamp()
                            .setTitle(Title)
                            .setDescription(`Time left - **${days} days**, **${hours} hours** and ${minutes} minutes`)
                            .setAuthor(`Timer started by ${usertag}`);
    return embed;

                            
};
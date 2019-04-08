"use strict";
const Discord = require('discord.js');
const timerlib = require('easytimer.js').Timer;
const client = new Discord.Client();
const auth = require('./auth.json');
const embeds = require('./embeds.js');

// TODO: let embedsToBeUpdated = []; 


let getArgs = (msg, cmd) => {
    let command = prefix + msg.content;
    let args = command.slice(command.indexOf(cmd) + cmd.length);
    return args;
};



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "uwu ";
client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
 
    if (message.content.startsWith(prefix + "start ")) {
        let commandRecd = "start ";
        let args = getArgs(message, commandRecd).split(",");

        if (args.length > 2){
            message.reply("Too many args!!!");
            return;
        }

        message.reply(args);
        

        let arg = args[0];

        let days = 0, hours = 0, minutes = 0;
        // let lastIndex = arg.indexOf('d');
        // if (lastIndex < 0) lastIndex = 0;
        // if (lastIndex > 0) {
        //     days = arg.slice(0, lastIndex);
        // }

        // let indexOfh = arg.indexOf("h");
        // if (indexOfh !== 0){
        //     hours = arg.slice(lastIndex, indexOfh);
        // }

        // Attempting to use regex for above.

        let regx = /(\d*)d|(\d*)h|(\d*)m/g; // THIS IS LITERALLY BLACK MAGIC DO NOT TOUCH
        let times = arg.match(regx);

        times.forEach( x => {
            let end = x.charAt(x.length - 1);
            if (end == 'd'){
                days = x.slice(0, x.length-1);
                return;
            }

            if(end == 'h'){
                hours = x.slice(0, x.length-1);
                return;
            }

            if(end == 'm'){
                minutes = x.slice(0, x.length-1);
                return;
            }
        })

        //message.reply(`DAYS - ${days} HOURS - ${hours} MINS - ${minutes}`);
        

        let timer = new timerlib();
        timer.start({
            countdown: true,
            startValues: {          // Temp for testing purposes.
                days,
                hours,
                minutes
            },
            precision: 'minutes'
        });

        let embedmsg;
        message.channel.send({ embed: embeds(message.author.tag, days, hours, minutes, args[1]) }).then( m => embedmsg = m);

        timer.on('minutesUpdated', () => {
            minutes = timer.getTimeValues().minutes; //FOR TESTING
            embedmsg.edit({ embed: embeds(message.author.tag, days, hours, minutes, args[1]) });
            console.log(`Minutes updated value of hours is ${hours}`)
        });

        timer.on('hoursUpdated', () => {
            hours = timer.getTimeValues().hours; // FOR TESTING
            embedmsg.edit({ embed: embeds(message.author.tag, days, hours, minutes, args[1]) });
            console.log(`Day Updates value of days is ${days}`)
        });

        timer.on('daysUpdated', () => {
            days = timer.getTimeValues().days; // FOR TESTING
            embedmsg.edit({ embed: embeds(message.author.tag, days, hours, minutes, args[1]) });
            console.log(`Hours Updates value of days is ${days}`)
        })

        timer.on('targetAchieved', () => {
            message.channel.send(`@everyone The timer titled ${args[1]} has finished! `);
        });
        
    }
});

client.login(auth.token);
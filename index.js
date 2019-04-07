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

        let arg = args[0];

        let days, hours;
        let lastIndex = arg.indexOf('d') || 0;
        if (lastIndex !== 0) {
            days = arg.slice(0, lastIndex);
        }

        let indexOfh = arg.indexOf("h");
        if (indexOfh !== 0){
            hours = arg.slice(lastIndex + 1, indexOfh);
        }

        let embed = embeds(message.author.tag, days, hours, args[1]);

        message.channel.send({ embed });

        // let timer = new timerlib();
        // timer.start({
        //     countdown: true,
        //     startValues: {
        //         days,
        //         hours
        //     }
        // })

        
    }
});

client.login(auth.token);
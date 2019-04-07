"use strict";
const Discord = require('discord.js');
const timerlib = require('easytimer.js').Timer;
const client = new Discord.Client();
const auth = require('./auth.json');

let timer = new timerlib();

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
        let args = getArgs(message, commandRecd).split(" ");

        if (args.length > 1){
            message.reply("Too many args!!!");
            return;
        }

        let arg = args[0];

        let hours, minutes;
        let lastIndex = arg.indexOf('h') || 0;
        if (lastIndex !== 0) {
            hours = arg.slice(0, lastIndex);
        }

        let indexOfM = arg.indexOf("m");
        if (indexOfM !== 0){
            minutes = arg.slice(lastIndex + 1, indexOfM);
        }

        message.reply(`Parsed arguments, ${hours}hours and ${minutes}minutes`);
        
    }
});

client.login(auth.token);
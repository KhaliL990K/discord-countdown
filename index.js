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
        let args = getArgs(message, commandRecd);
        message.reply(`Args are \`\`\`${args}\`\`\` `);
    }
});

client.login(auth.token);
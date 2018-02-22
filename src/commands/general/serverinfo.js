const Commando = require("discord.js-commando");
const request = require("request");
const Discord = require('discord.js');
const moment = require('moment');

module.exports = class GeneralServerIDCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "serverinfo",
            group: "general",
            memberName: "serverinfo",
            description: "Shows discord server information"
        });
    }
    
    async run (msg, args, client) {
        if (msg.channel.type === "text") {
            /* Converting TimeStamp to date/time */
            var time = moment(msg.guild.createdTimestamp).format("DD-MM-YYYY HH:mm:ss");
            var user_card = new Discord.RichEmbed()
                .setTitle(msg.guild.name)
                .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
                .addField("Server ID", msg.guild.id, true)
                .addField("Location", msg.guild.region, true)
                .addField("Total Members", msg.guild.memberCount, true)
                .addField("Total Channels", msg.guild.channels.array().length, true)
                .addField("Created on", time, true)
                .addField("Owner", msg.guild.owner.user.username, true)
                .setThumbnail(msg.guild.iconURL)
            msg.channel.send(user_card);
        } else {
            msg.channel.send("You need to run that command in a servers text channel!");
        }
    }
};
const Discord = require("discord.js");
const Commando = require("discord.js-commando");
const util = require('util');
const config = require("../../Config.js");
const moment = require('moment');

module.exports = class GeneralInfoCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "info",
            group: "general",
            memberName: "info",
            description: "Bot information"
        });
    }
    
    async run(msg, args, client) {
        var card = new Discord.RichEmbed()
            .setDescription("Let's fucking get schwifty!!")
            .setTitle("Bot information")
            .addField("Total Servers", this.client.guilds.array().length, true)
            .addField("Bot Hardware Uptime", moment(this.client.uptime).format("HH:mm:ss"), true)
            .setAuthor("Schwifty", "", "https://discord.gg/aaeFxfp")
            .setColor("#B4045F")
            .setFooter(util.format("%shelp for more information", config.get("bot.prefix")));
        
        msg.channel.sendEmbed(card);
    }
};
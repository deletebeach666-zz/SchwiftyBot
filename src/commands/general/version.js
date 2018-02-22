const Commando = require("discord.js-commando");
const request = require("request");
const BOT_VER = require('../../../package.json').version;
module.exports = class GeneralVersionCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "version",
            aliases: ["ver"],
            group: "general",
            memberName: "version",
            description: "Shows Bot Version"
        });
    }
    
    async run (msg, args, client) {
        msg.channel.send("**Version:** " + BOT_VER);
    }
};
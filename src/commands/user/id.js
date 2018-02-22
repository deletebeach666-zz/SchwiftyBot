const Commando = require("discord.js-commando");
const request = require("request");
module.exports = class GeneralIDCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "id",
            group: "user",
            memberName: "id",
            description: "Shows client discord id"
        });
    }
    
    async run (msg, args, client) {
        msg.channel.send("**Your ID:** " + msg.author.id);
    }
};
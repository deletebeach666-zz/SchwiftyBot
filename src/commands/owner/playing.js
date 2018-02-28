const Commando = require("discord.js-commando");
const request = require("request");
const Config = require("../../Config.js");
const _ = require("underscore");

module.exports = class OwnerPlayingCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "ownerplaying",
            group: "owner",
            memberName: "ownerplaying",
            description: "Changes playing for the bots status (Use 0 to disable)",
            guildOnly: true,
            
            args: [
                {
                    key: 'game',
                    label: 'game',
                    prompt: 'What would you like to set the bot playing?',
                    type: 'string'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if (!msg.guild) return this.client.isOwner(msg.author);
        if ((Config.get("bot.main_discord_id") === msg.guild.id && msg.member.hasPermission("ADMINISTRATOR")) || this.client.isOwner(msg.author))
        {
            return true;
        }
        return false;
    }
    
    async run (msg, args, client) {
        if (args.game === "0")
        {
            this.client.user.setGame(null);
            msg.reply("Removing now playing.. you horrible person.");
        } else {
            this.client.user.setGame(args.game);
            msg.reply("I'm now playing **" + args.game + "**");
        }
    }
};
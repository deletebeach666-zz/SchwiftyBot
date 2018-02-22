const Commando = require("discord.js-commando");
const Discord = require('discord.js');
const request = require("request");
const config = require('../../Config.js');
  
module.exports = class GeneralTopicCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "topic",
            group: "moderation",
            memberName: "topic",
            description: "Set Guild Channel Topic",
            
            args: [
                {
                    key: 'topic',
                    label: 'topic',
                    prompt: 'What topic would you like to add?',
                    type: 'string'
                }
            ]
        });
    }
    
    async run(msg, args, client) {
        if (msg.guild === null) { return msg.reply("This command can be only used in guild channels"); }
        if (msg.member.hasPermission("MANAGE_CHANNELS") === true) {
            msg.channel.setTopic(args.topic)
             .then(msg.reply("Topic for #" + msg.channel.name + " has been changed to: " + args.topic))
             .catch(console.error);
        } else {
            msg.reply("You do not have permission to set channel topic!");
        }
    }
};
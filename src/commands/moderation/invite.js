const Commando = require("discord.js-commando");
const Discord = require('discord.js');
const request = require("request");
const config = require('../../Config.js');
  
module.exports = class GeneralInviteCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "invite",
            group: "moderation",
            memberName: "invite",
            description: "Bot Invitation",
        });
    }
    
    async run(msg, args, client) {
        var perm = [
                  "CREATE_INSTANT_INVITE",
                  "KICK_MEMBERS",
                  "BAN_MEMBERS",
                  "ADMINISTRATOR",
                  "MANAGE_CHANNELS",
                  "MANAGE_GUILD",
                  "ADD_REACTIONS", // add reactions to messages
                  "READ_MESSAGES",
                  "SEND_MESSAGES",
                  "SEND_TTS_MESSAGES",
                  "MANAGE_MESSAGES",
                  "EMBED_LINKS",
                  "ATTACH_FILES",
                  "READ_MESSAGE_HISTORY",
                  "MENTION_EVERYONE",
                  "EXTERNAL_EMOJIS", // use external emojis
                  "CONNECT", // connect to voice
                  "SPEAK", // speak on voice
                  "MUTE_MEMBERS", // globally mute members on voice
                  "DEAFEN_MEMBERS", // globally deafen members on voice
                  "MOVE_MEMBERS", // move member's voice channels
                  "USE_VAD", // use voice activity detection
                  "CHANGE_NICKNAME",
                  "MANAGE_NICKNAMES", // change nicknames of others
                  "MANAGE_ROLES_OR_PERMISSIONS",
                  "MANAGE_WEBHOOKS",
                  "MANAGE_EMOJIS"
              ];
        this.client.generateInvite(perm)
        .then(link => {
            msg.reply(`Link: ${link}`);
        });
    }
};
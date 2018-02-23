const Commando = require("discord.js-commando");
const request = require("request");
const Discord = require('discord.js');
const config = require('../../Config.js');
var to_json = require('xmljson').to_json;
var striptags = require('striptags');

module.exports = class UserSteamidCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "steamid",
            group: "user",
            memberName: "steamid",
            description: "Get Steam user info",
            examples: ['steamid gabelogannewell'],
            
            args: [
                {
                    key: 'steamid',
                    label: 'steamid',
                    prompt: 'What Steam user do you want to stalk? ( ͡° ͜ʖ ͡°)',
                    type: 'string'
                }
            ]
        });
    }
    

    async run (msg, args, client) {
        request("http://steamcommunity.com/id/"+args.steamid+"?xml=1", function (error, response, body) {
            to_json(body, function (error, data) {
                var user_card = new Discord.RichEmbed()
                    .setTitle(data.profile.steamID)
                    .setURL('http://steamcommunity.com/id/' + args.steamid + '/')
                    .setColor((data.profile.visibilityState) ? "#ffffff" : "#FFFFFF")
                    .addField("SteamID", data.profile.steamID64, true)
                    .addField("Location", data.profile.location, true)
                    .setDescription(striptags(data.profile.summary))
                    .setThumbnail(data.profile.avatarFull)
                msg.channel.send(user_card);
            });
        });
    }
};
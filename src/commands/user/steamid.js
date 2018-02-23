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
                if (data.profile === undefined) { return msg.channel.send("**[Error]** Invalid Steam ID"); }
                if (data.profile.privacyState === "private") {
                    var user_card2 = new Discord.RichEmbed()
                    .setTitle(data.profile.steamID)
                    .setURL('http://steamcommunity.com/id/' + args.steamid + '/')
                    .setColor((data.profile.visibilityState) ? "#ffffff" : "#FFFFFF")
                    .addField("SteamID", data.profile.steamID64, true)
                    .setDescription("This profile is private.")
                    .setThumbnail(data.profile.avatarFull)
                    msg.channel.send(user_card2);
                } else {
                    var game = "";
                    var hours = 0;
                    if (data.profile.mostPlayedGames === undefined) {
                        game = "N/A";
                        hours = "N/A"
                    } else if (data.profile.mostPlayedGames.mostPlayedGame["0"] == undefined) {
                        game = data.profile.mostPlayedGames.mostPlayedGame.gameName;
                        hours = data.profile.mostPlayedGames.mostPlayedGame.hoursOnRecord
                    } else {
                        game = data.profile.mostPlayedGames.mostPlayedGame["0"].gameName;
                        hours = data.profile.mostPlayedGames.mostPlayedGame["0"].hoursOnRecord
                    }
                var user_card = new Discord.RichEmbed()
                    .setTitle(data.profile.steamID)
                    .setURL('http://steamcommunity.com/id/' + args.steamid + '/')
                    .setColor((data.profile.visibilityState) ? "#ffffff" : "#FFFFFF")
                    .addField("SteamID", data.profile.steamID64, true)
                    .addField("Location", data.profile.location, true)
                    .addField("Most Played Game:", game + " -|- Playtime: " + hours + " hours", true)
                    .setDescription(striptags(data.profile.summary))
                    .setThumbnail(data.profile.avatarFull)
                    msg.channel.send(user_card);

                }
                
            });
        });
    }
};
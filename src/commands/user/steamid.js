const Commando = require("discord.js-commando");
const request = require("request");
const Discord = require('discord.js');
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
        request('https://api.obfam.in/steam/?id=' + args.steamid, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var res = JSON.parse(body);
                if (res.response.players.length === 0) {
                    return msg.channel.send("**Uh-oh!** No SteamID found for " + args.steamid)
                }
                var steam_user = res.response.players[0];
                var user_card = new Discord.RichEmbed()
                    .setTitle(steam_user.personaname)
                    .setURL(steam_user.profileurl)
                    .setColor((steam_user.personastate) ? "#01DF01" : "#FFFFFF")
                    .addField("SteamID", steam_user.steamid, true)
                    .addField("Location", steam_user.loccountrycode, true)
                    .setDescription((steam_user.realname) ? steam_user.realname : '')
                    .setThumbnail(steam_user.avatarfull)
                msg.channel.send(user_card);
            } else {
                //console.log(response.statusCode);
            }
        });
    }
};
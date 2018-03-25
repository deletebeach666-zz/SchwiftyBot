const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');

module.exports = class GeneralWeatherCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "bill",
            group: "fun",
            memberName: "bill",
            description: "Random be like bill meme generator",
            examples: ["meme"],
        });
    }
    
    async run(msg, args, client) {
                msg.channel.send({embed: {
                  color: 3447003,
                  image: {
                        "url": "http://belikebill.azurewebsites.net/billgen-API.php?default=1",
                         },
                }});
    }
};
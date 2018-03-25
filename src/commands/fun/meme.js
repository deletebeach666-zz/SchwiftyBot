const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');

module.exports = class GeneralWeatherCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "meme",
            group: "fun",
            memberName: "meme",
            description: "Random meme generator",
            examples: ["meme"],
        });
    }
    
    async run(msg, args, client) {
        request("https://api.imgflip.com/get_memes", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var object = JSON.parse(body);
                var min = Math.ceil(0);
                var max = Math.floor(object.data.memes.length);
                var meme = object.data.memes[Math.floor(Math.random() * (max - min)) + min];
                msg.channel.send({embed: {
                  color: 3447003,
                  description: meme.name,
                  image: {
                        "url": meme.url,
                         },
                }});
            }
        });
    }
};
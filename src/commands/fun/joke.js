const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');

module.exports = class GeneralWeatherCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "joke",
            group: "fun",
            memberName: "joke",
            description: "Random YoMama Joke",
            examples: ["joke"],
        });
    }
    
    async run(msg, args, client) {
        request("http://api.yomomma.info/", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var object = JSON.parse(body);
                msg.reply(object.joke);
            }
        });
    }
};
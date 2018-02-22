const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');

module.exports = class GeneralWeatherCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "weather",
            group: "general",
            memberName: "weather",
            description: "Shows weather of given location",
            examples: ["weather London"],
            
            args: [
                {
                    key: 'location',
                    label: 'location',
                    prompt: 'What location do you want to check the weather?',
                    type: 'string'
                }
            ]
        });
    }
    
    async run(msg, args, client) {
        request('http://api.openweathermap.org/data/2.5/weather?q=' + args.location + '&appid=' + config.get("commands.open_weather_map_api"), function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var object = JSON.parse(body);
                var temp = [];
                temp.main = object.main.temp - 273;
                temp.min = object.main.temp_min - 273;
                temp.max = object.main.temp_max - 273;
                if (object.cod == "404") {
                    msg.channel.send("**[ERROR]** Location could not be found");
                } else {
                msg.channel.send("Status: " + object.weather[0].main + " | Temperature: " + Math.round(temp.main) + " °C (Minimum Temperature: " + Math.round(temp.min) + "°C | Maximum Temperature: " + Math.round(temp.max) + "°C) | Country: " + object.sys.country + " | City: " + object.name);
                }
            }
        });
    }
};
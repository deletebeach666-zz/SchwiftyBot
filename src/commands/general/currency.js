const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');

module.exports = class GeneralCurrencyCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "currency",
            group: "general",
            memberName: "currency",
            description: "Shows weather of given location",
            examples: ["currency 100 GBP USD"],
            
            args: [
                {
                    key: 'amount',
                    label: 'amount',
                    prompt: 'How much amount would you like to convert?',
                    type: 'string'
                },
                {
                    key: 'from',
                    label: 'from',
                    prompt: 'Which currency would you like to convert it from?',
                    type: 'string'
                },
                {
                    key: 'to',
                    label: 'to',
                    prompt: 'Which currency would you like to convert it to?',
                    type: 'string'
                }
            ]
        });
    }
    
    async run(msg, args, client) {
        request("https://api.obfam.in/currency.php?from=" + args.from + "&to=" + args.to + "&amount=" + args.amount, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var object = JSON.parse(body);
                msg.channel.send("**Currency Converter:** " + args.amount + args.from + " => " + object.result + args.to);
            }
        });
    }
};
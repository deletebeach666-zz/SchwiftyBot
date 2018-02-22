const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');
const shorten = require('goo.gl');
shorten.setKey(config.get("commands.google_auth_key"));

module.exports = class GeneralURLShortenerCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "shortenurl",
            group: "general",
            memberName: "shortenurl",
            description: "Shortens Long URL to goo.gl based URLs",
            examples: ["shortenurl https://obfam.in/?page=index"],
            
            args: [
                {
                    key: 'url',
                    label: 'url',
                    prompt: 'Which URL would you like to shorten?',
                    type: 'string'
                }
            ]
        });
    }
    
    async run(msg, args, client) {
        shorten.shorten(args.url)
        .then(function (shortUrl) {
            msg.channel.send("**Short URL:** " + shortUrl + " -|- **Long URL:** " + args.url)
        })
        .catch(function (err) {
            msg.channel.send(err.message);
        });
    }
};

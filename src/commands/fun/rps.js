const Commando = require("discord.js-commando");
const request = require("request");
const config = require('../../Config.js');

module.exports = class GeneralRPSCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "rps",
            group: "fun",
            memberName: "rps",
            description: "Game: Rock Paper Scissors",
            examples: ["rps scissors"],
            
            args: [
                {
                    key: 'choice',
                    label: 'choice',
                    prompt: 'Usage: rps <choice>',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args, client) {
        var choice = args.choice;
        choice = choice.toLowerCase();
        var computer = Math.random();
        var available = {"rock":true, "paper":true, "scissors":true};
        if (available[choice] != true) { return msg.reply("**Usage:** rps <rock/paper/scissors>"); }

        if (computer < 0.33) {
            computer = "rock";
        } else if (computer > 0.66) {
            computer = "paper";
        } else {
            computer = "scissors";
        }

        var attempt = function (value1, value2, choice1, choice2) {
            if (value1 === choice1 && value2 === choice2) {
                return (true);
            } else if (value1 === choice2 && value2 === choice1) {
                return (true);
            }
            return (false);
        }

        var getResult = function (choice1, choice2) {
            if (attempt("paper", "rock", choice1, choice2)) {
                return("**Result:** Paper Wins!");
            } else if (attempt("paper", "scissors", choice1, choice2)) {
                return("**Result:** Scissors Wins!");
            } else if (attempt("scissors", "rock", choice1, choice2)) {
                return("**Result:** Rock Wins!");
            }
            return("**Result:** Match Tied!");
        }
            msg.channel.send(getResult(choice, computer));

    }
};
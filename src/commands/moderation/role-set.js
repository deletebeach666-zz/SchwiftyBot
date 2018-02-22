const Commando = require("discord.js-commando");
const Discord = require('discord.js');
const request = require("request");
const config = require('../../Config.js');
  
module.exports = class GeneralKickCommand extends Commando.Command {
    constructor(client) {
        super (client, {
            name: "setrole",
            group: "moderation",
            memberName: "setrole",
            description: "Set Role for Player",
            
            args: [
                {
                    key: 'user',
                    label: 'user',
                    prompt: 'Which user would you like to select to set role?',
                    type: 'member'
                },
                {
                    key: 'role',
                    label: 'role',
                    prompt: 'Which role would you like to select for this user?',
                    type: 'role'
                }
            ]
        });
    }
    
    async run(msg, args, client) {
        if (msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") === true) {
            var userRole = msg.member.highestRole;
            if (userRole.comparePositionTo(args.user.highestRole) < 0) { return msg.reply("**Access Denied:** You do not have permission to set role for this user."); }
            if (args.user.kickable == false) { return msg.reply("**Access Denied:** Bot does not have permissions to set role for this user!"); }
            var role = [args.role];
            args.user.setRoles(role)
            .then(msg.reply("Role: " + args.role.toString() + " has been assigned to " + args.user.displayName + "!"))
            .catch(console.error);
        } else {
            msg.reply("**Access Denied:** You do not have permission to set role for guild users.");
        }
    }
};
  const Commando = require("discord.js-commando");
  const Discord = require('discord.js');
  const request = require("request");
  const config = require('../../Config.js');
    
  module.exports = class GeneralKickCommand extends Commando.Command {
      constructor(client) {
          super (client, {
              name: "kick",
              group: "moderation",
              memberName: "kick",
              description: "Kick Player",
              
              args: [
                  {
                      key: 'user',
                      label: 'user',
                      prompt: 'Which user would you like to kick?',
                      type: 'member'
                  },
                  {
                      key: 'reason',
                      label: 'reason',
                      prompt: 'Why would you like to kick this user?',
                      type: 'string'
                  }
              ]
          });
      }
      
      async run(msg, args, client) {
          if (msg.member.hasPermission("KICK_MEMBERS") === true) {
              var userRole = msg.member.highestRole;
              if (userRole.comparePositionTo(args.user.highestRole) < 0) { return msg.reply("**Access Denied:** You do not have permission to kick this user."); }
              if (args.user.kickable == false) { return msg.reply("**Access Denied:** Bot does not have permissions to kick this user!"); }
              var user_card = new Discord.RichEmbed()
                  .setTitle("Moderation Log")
                  .setColor("#FF0000")
                  .addField("User", args.user.displayName, true)
                  .addField("Action", "Kick", true)
                  .addField("Admin", msg.member.displayName)
                  .addField("Reason", args.reason, true)
                  .setThumbnail(args.user.user.displayAvatarURL);
              args.user.kick()
              .then(msg.channel.send(user_card))
              .catch(console.error);
              args.user.user.send(user_card)
              
          } else {
              msg.reply("**Access Denied:** You do not have permission to kick guild users.");
          }
      }
  };
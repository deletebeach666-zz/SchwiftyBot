/* Configuration */
const request = require("request");
const path = require('path');
const _ = require('underscore');

/* Load config file */
const config = require('./src/Config.js');
const BOT_VER = require('./package.json').version;
const BOT_OWNERS = config.get('bot.owners');
const MAIN_DISCORD = config.get("bot.main_discord_id");
/* Commando Installation */
const Commando = require('discord.js-commando');
const client = new Commando.Client({
    commandPrefix: config.get('bot.prefix'),
    owner: BOT_OWNERS
});

client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('ready', () => {
        console.log(`-> Client ready! \n-> Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
        console.log(`-> Servers: ${client.guilds.array().length}`);
    })
    .on('commandError', (cmd, err) => {
        if(err instanceof Commando.FriendlyError) return;
        console.error('Error in command ${cmd.groupID}:${cmd.memberName}', err);
    })
    .on('message', (msg) => {
        //console.log(msg);
    });

client.registry
    .registerGroups([
        ['general', 'General Category'],
        ['fun', 'Fun Category'],
        ['user', 'User Category'],
        ['moderation', 'Moderation Category'],
        ['music', 'Music Category'],
        ['owner', 'Owner commands (must be defined in config)']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'src/commands'));


client.login(config.get('bot.token'));
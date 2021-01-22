const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    var server = client.servers[message.guild.id];

    if(!server || !server.dispatcher) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_voicechannel())
        return message.channel.send(embed);
    }

    if(message.guild.me.voice.channel){
        if(message.guild.me.voice.channel && message.member.voice.channel === message.guild.me.voice.channel){  
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.skip.skipping(message.author.tag))
            message.channel.send(embed);
            if(server.dispatcher) server.dispatcher.emit("finish");
        }
    }

};

module.exports.help = {
    name: 'skip',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['s']
};

const Discord = require("discord.js");
const client = new Discord.Client()
var fs = require("fs");
const { time } = require("console");
const { stringify } = require("querystring");
const cron = require("cron");
const { AttachmentBuilder, EmbedBuilder, MessageAttachment } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {token }= require('./config.json');



// install discordjs 12.5.1 version instead of newest
// npm i discord.js@12.5.1



const prefix = '=';



async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
function _getprefix(message){
	return prefix;
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function sendFlowers(){
	// charlotte: 701266333857218581
	var msg = ''
	const rand = getRandom(10, 40);
	const flowerFile = fs.readdirSync(`./flowers/`).filter(file => file.endsWith(`${rand}.jfif`));
		msg += flowerFile[0].slice(0, flowerFile[0].length - 7) + ' ';	
	switch(Math.floor(Math.random() * 6)){
		    case 0:
				msg += '<3'
				break
			case 1:
				msg += ':D'
				break
			case 2:
				msg += ':)'
				break
			case 3:
				msg += ';)'
				break
			case 4:
				msg += '>:D'
				break
			case 5:
				msg += '^_^'
				break
	}
	console.log(msg)

	const attachment = new MessageAttachment(`./flowers/${flowerFile[0]}`, 'flowerpic.png');

	const newEmbed = new Discord.MessageEmbed()
	.setColor('9C89FF')
	.setTitle('Good Morning Charlotte!')
	.setDescription(msg)
	.setTimestamp();
	// .setFooter('From August Hogen-Esch');
	client.users.fetch('846780568203952158', false).then((user) => {
		user.send(newEmbed)
		user.send({embeds: [newEmbed], files: [attachment]});
	   });
	client.users.fetch('701266333857218581', false).then((user) => {
	user.send(newEmbed)
	user.send({embeds: [newEmbed], files: [attachment]});
	});


}




client.once('ready', () => {
    console.log('Bot is online!');
	//1 day = 86400000ms
	sendFlowers();
	let scheduledMessage = new cron.CronJob('00 30 10 * * *', sendFlowers);
	// 	// This runs every day at 10:30:00, you can do anything you want			  
	// // When you want to start it, use:
	scheduledMessage.start();
});




process.on('uncaughtException', function (err) {
	// Error logging, won't crash the bot this way.
	console.log('Caught exception: ', err);
});


client.login(token);
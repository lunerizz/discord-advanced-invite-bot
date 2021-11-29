const config = require("../config.json")
module.exports = {
    name: "message",
    once: false,
    run: async(client, message) => {

	const prefix = config.PREFIXS.find((x) => message.content.toLowerCase().startsWith(x));
	if (message.author.bot && message.author.id != client.user.id || !message.guild || !prefix) return;
	let args = message.content.slice(prefix.length).trim().split(/ +/)
  args.prefix = prefix
  let commandName = args.shift().toLowerCase()
  
  try {
    const command = client.commands.get(commandName) ||  client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if(command) {
    command.run(message, args)
    }
    } catch (e) {
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    message.channel.send({ content: `${config.OWNERS.map(x => `${message.guild.members.cache.get(x)}`).join(', ')}.`, embeds: [client.embed] });
   }

}};
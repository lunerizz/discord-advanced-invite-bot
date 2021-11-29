const invite = require("../models/inviter")
module.exports = {
    name: `invites`,
    description: `Kullanıcının davetlerini gösterir.`,
    aliases: [`davetlerim`, `davet`],
    permission: `EVERYONE`,
    category: `Global`,
    run: async(client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);
        const inviterData = await inviter.findOne({ guild: message.guild.id, user: user.id })
        let fakes = inviterData ? inviterData.fake : 0
        let regular = inviterData ? inviterData.regular : 0
        let bonus = inviterData ? inviterData.bonus : 0
        let leave = inviterData ? inviterData.leave : 0
        client.embed.setDescription(`Senin ${regular + bonus + fakes + leave} davetin var! (**${regular}** gerçek, ${fakes} sahte, ${bonus} bonus, ${leave} ayrılan)`);
        message.channel.send(client.embed)

}};
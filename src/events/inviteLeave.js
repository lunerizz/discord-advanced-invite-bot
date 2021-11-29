const config = require("../config.json");
const inviter = require("../models/inviter");
const invited = require("../models/invited");
module.exports = {
    name: "inviteJoin",
    once: false,
    run: async(client, member) => {

    const user = member.guild.members.cache.get(member.id);
    const invite_log = member.guild.channels.cache.get(config.INVITE_LOG_CHANNEL);
    let invited_data = await invited.findOne({ guild: member.guild.id, user: member.id });
    if(invited_data) {
        if(invited_data.code == config.GUILD_URL) {
            invite_log.send(`${config.STAR_EMOJI} ${member.user.tag} kullanıcısı **SUNUCU ÖZEL URL** tarafından sunucuya davet edildi.`)
        }
        if(invited_data.code != config.GUILD_URL) {
            let invitedData = await invited.findOne({ guild: member.guild.id, user: member.id })
            let inviterData = await inviter.findOne({ guild: member.guild.id, user: invitedData.inviter })
        
            if(inviterData) {
                inviterData.regular -= 1
                inviterData.leave += 1
                await client.save(inviterData)
            }
            if(!inviterData) {
                const schema = new inviter({ guild: member.guild.id, user: inviteUser.id, regular: 0, fakes: 0, bonus: 0, leave: 1 })
                await client.save(schema)
            }
            
            if(invitedData) {
                await invited.findByIdAndRemove(invitedData._id)
            }
        
        
            let newinvitedData = await inviter.findOne({ guild: member.guild.id, user: inviteUser.id })
        
            let fakes = newinvitedData ? inviterData.fake ? inviterData.fake : 0 : 0
            let regular = newinvitedData ? inviterData.regular ? inviterData.regular : 0 : 0
            let bonus = newinvitedData ? inviterData.bonus ? inviterData.bonus : 0 : 0
            let total = regular + bonus + fakes

            invite_log.send(`${config.STAR_EMOJI} ${member.user.tag} kullanıcısı sunucudan ayrıldı. (Davet eden: ${inviter}'nin \`${total}\` daveti kaldı.)`)
        }
    }
    if(!invited_data) {
        invite_log.send(`${config.STAR_EMOJI} ${member.user.tag} kullanıcısı sunucudan ayrıldı fakat kimin davet ettiği bulunamadı.`)
    }

}};;
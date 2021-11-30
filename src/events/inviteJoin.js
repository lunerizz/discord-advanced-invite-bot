const config = require("../config.json");
const inviter_schema = require("../models/inviter");
const invited_schema = require("../models/invited");
module.exports = {
    name: "inviteJoin",
    once: false,
    run: async(client, member, invite, inviter) => {

    const user = member.guild.members.cache.get(member.id);
    const invite_log = member.guild.channels.cache.get(config.INVITE_LOG_CHANNEL);
    if(invite) {
        if(invite.code == config.GUILD_URL) {
            invite_log.send(`${config.STAR_EMOJI} ${member} kullanıcısı **SUNUCU ÖZEL URL** tarafından sunucuya davet edildi.`)
        }
        if(inviter.id == member.id) {
            invite_log.send(`${config.STAR_EMOJI} ${member} kullanıcısı kendi kendini davet ettiği için işlem yapılmadı.`)
        }
        if(inviter.id != member.id) {
            let invitedData = await invited_schema.findOne({ guild: member.guild.id, user: member.id });
                let inviterData = await inviter_schema.findOne({ guild: member.guild.id, user: inviter.id });
                
                if(inviterData) {
                    inviterData.regular += 1
                    await inviterData.save()
                }
                if(!inviterData) {
                    const schema = new inviter_schema({ guild: member.guild.id, user: inviter.id, regular: 1, fake: 0, bonus: 0, leave: 0 })
                    await schema.save()
                }
        
                if(invitedData) {
                    invitedData.code = invite.code
                    invitedData.inviter = inviter.id
                    await invitedData.save()
                }
                if(!invitedData) {
                    const schema = new invited_schema({ guild: member.guild.id, user: user.id, inviter: inviter.id, code: invite.code })
                    await schema.save()
                }
        
                let messageData = await inviter_schema.findOne({ guild: member.guild.id, user: inviter.id });
                let fakes = messageData ? messageData.fake : 0;
                let regular = messageData ? messageData.regular : 0;
                let bonus = messageData ? messageData.bonus : 0;
                let total = regular + bonus + fakes;
            invite_log.send(`${config.STAR_EMOJI} ${member} kullanıcısı ${inviter} tarafından sunucuya davet edildi. (${inviter} \`${total}.\` davetine ulaştı.)`)
        }
    }
    if(!invite) {
        invite_log.send(`${config.STAR_EMOJI} ${member} kullanıcısı sunucuya katıldı fakat kimin davet ettiği bulunamadı.`)
    }
}};

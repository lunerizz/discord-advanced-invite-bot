const config = require("../config.json")
module.exports = {
    name: "ready",
    once: false,
    run: async(client) => {

    client.user.setActivity(config.BOT_ACTIVITY)
}};

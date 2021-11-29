const config = require("./src/config.json")
module.exports = {
    name: "ready",
    once: false,
    run: async(client) => {

    client.user.setActivity(config.BOT_ACTIVITY)
}};
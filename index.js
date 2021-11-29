const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { connect } = require("mongoose");
const { on } = require("toanky-invite")
const config = require("./src/config.json")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] })
on(client)

const embed = client.embed = new MessageEmbed().setColor("RANDOM")

client.commands = new Map();

const commandFiles = readdirSync("./src/commands").filter((file) => file.endsWith(".js"));
commandFiles.forEach(file => {
    const command = require(`./src/commands/${file}`);
    console.log(`Yüklenen Komut: ${command.name} ✅`);
    client.commands.set(command.name, command);
});
console.log(`Toplam ${commandFiles.length} komut yükleniyor. ✅`);

const eventFiles = readdirSync("./src/events").filter((file) => file.endsWith(".js"));
eventFiles.forEach(file => {
    const event = require(`./src/events/${file}`);
    client.on(event.name, (client, ...args) => event.run(client, ...args));
    console.log(`Yüklenen Event: ${event.name} ✅`);
})
console.log(`Toplam ${eventFiles.length} komut yükleniyor. ✅`);

client.on("disconnect", () => console.warn("Bot is disconnecting..."));
client.on("reconnecting", () => console.log("Bot reconnecting..."));
client.on("error", e => console.error(e));
client.on("warn", info => client.warn(info));

process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Promise Hatası: ", err);
});

client.login(config.BOT_TOKEN).then(console.log("Bot bağlantısı kuruldu ✔"))
connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Mongo bağlantısı kuruldu ✔"))

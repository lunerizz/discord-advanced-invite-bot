module.exports = {
    name: "error",
    once: false,
    run: async(client, error) => {

    console.error(`Discord.js tarafından bir hata oluştu: \n${error}`)
}};
const { Schema, model } = require("mongoose");

const schema = new Schema({
    guild: String,
    user: String,
    inviter: String,
    code: String
})

module.exports = model(`toanky_invited`, schema)
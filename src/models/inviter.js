const { Schema, model } = require("mongoose");

const schema = new Schema({
    guild: String,
    user: String,
    regular: Number,
    bonus: Number,
    leave: Number,
    fake: Number
})

module.exports = model(`toanky_inviter`, schema)
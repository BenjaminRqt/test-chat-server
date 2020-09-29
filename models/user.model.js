const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

const UserSchema = new Schema({
    username: Types.String
})

module.exports = mongoose.model("User", UserSchema, "users")

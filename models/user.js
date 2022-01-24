const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: { type: "string", required: true },
    country: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
})

mongoose.model("User", userSchema);
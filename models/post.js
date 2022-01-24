const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    image: { type: "string", required: true },
    place: { type: "string" },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{ text: String, postedBy: { type: ObjectId, ref: "User" } }],
    postedBy: { type: ObjectId, ref: "User" }
}, { timestamps: true })

mongoose.model("Post", postSchema);
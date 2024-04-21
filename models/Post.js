const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post must have title"]
    },
    body: {
        type: String,
        required: [true, "Body is required"]
    },
})

module.exports = mongoose.model("POST", postSchema)
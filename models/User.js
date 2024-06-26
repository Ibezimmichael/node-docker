const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'First Name is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
})

module.exports = mongoose.model("User", userSchema);

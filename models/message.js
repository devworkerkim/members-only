const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String },
    text: { type: String },
    date_created: { type: Date, default: new Date() },
    author: { type: mongoose.Types.ObjectId },
});

module.exports = mongoose.model('message', MessageSchema );
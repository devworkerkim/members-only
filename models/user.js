const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'active'], default: 'pending'},
    admin: { type: Boolean, default: 'false'}
});

module.exports = mongoose.model('user', UserSchema);
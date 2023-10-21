const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    photourl: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: {
        type: String,
        required: false,
    },
    education: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

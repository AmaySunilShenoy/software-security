const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favNumber: {
        type: String,
        required: true,
    },
    favMammal: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
    },
    city: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
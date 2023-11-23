const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ContactModel = mongoose.model("contact", userSchema);

module.exports = { ContactModel };

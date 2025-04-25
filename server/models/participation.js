const mongoose = require("mongoose");
const { Schema } = mongoose;

const participationSchema = new Schema({
    event: {
        type: mongoose.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    checkedIn: {
        type: Boolean,
        default: false
    }
});

const Participation = mongoose.model("Participation", participationSchema);

module.exports = {
    Participation
};
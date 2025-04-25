const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = Schema({
    creater: {
        type: mongoose.ObjectId, ref: "User",
        required: true 
    },
    sport_name: {
        type: String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    // use the google maps geoloaction to make the address this and store it
    geolocation: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true}
    },
    time: {
        type: String,
        required: true 
    },
    date: {
        type: Date, 
        required: true
    },
    players: [{type: mongoose.ObjectId, ref: "User"}],
    private: {
        type: Boolean,
        required: true
    },
    players_needed: {type: Number}
});

const Event = mongoose.model("Event", eventSchema);
module.exports = {
    Event: Event
}
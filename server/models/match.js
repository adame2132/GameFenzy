const mongoose = require("mongoose");
const {Schema} = mongoose;

const matchSchema = Schema({
    event: {
        type: mongoose.ObjectId, ref: 'User',
        require: true

    },
    teams :[[{type: mongoose.ObjectId, ref: 'User'}]],
    score: [{type:Number}],
    winners: {type: Number},
    date: {type: Date}
});

const Match = mongoose.model("Match", matchSchema);
module.exports = {
    Match: Match 
}
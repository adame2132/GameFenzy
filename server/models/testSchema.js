const mongoose = require("mongoose");
const {Schema} = mongoose;
const testSchema = Schema({
    name : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Testy = mongoose.model("Testy", testSchema);

module.exports = {
    Testy : Testy
}
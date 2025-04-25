const mongoose = require('mongoose');
const {Schema} = mongoose;

const availabiltySchema = Schema({
    user: {
        type: mongoose.ObjectId, ref: "User",
        required: true
    },
    availability: [
        {
            day: {
                type: String,
                enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                required: true
            },
            time_slots: [{
                start:{
                    type: String,
                    required: true
                },
                end: {
                    type: String,
                    required: true
                }
            }
            ]
        }
    ]
});
const Availabilty = mongoose.model("Availabilty", availabiltySchema);
module.exports = {
    Availabilty: Availabilty
}
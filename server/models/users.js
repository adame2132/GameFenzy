const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = Schema({
    fname: {
        type: String, required: true
    },
    lname:{
        type: String, required: true
    },
    age: {
        type: Number, required: true
    },
    profile_pic: {
        type: String,
        select: false
    },
    email: {
        type:String,
        required: true, 
        unique: true,
        select: false
    },
    password: {type: String, required: true, select: false},
    sport_intrests: [{type: String}],
    bio: {type: String}
});
const User = mongoose.model("User", userSchema);
module.exports = {
    User: User
}
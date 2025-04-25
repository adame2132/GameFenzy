const mongoose = require("mongoose");
function isValidObject(response, id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        response.status(400).send("Not  A Valid userId");
    }
}

module.exports = {
    isValidObject
}
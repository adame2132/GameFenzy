function errorHandler(request, response, error){
    if (error.errors){
        var errorMessages = {};
        for(var feildname in error.errors){
            errorMessages[feildname] = error.errors[feildname].message
        }
        return response.status(422).json(errorMessages);
    }
    else{
        return response.status(500).send("Unkown Error in server");
    }
}

module.exports = {
    errorHandler
}
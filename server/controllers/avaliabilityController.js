const {Availabilty} = require("../models/avaliablity");
const {User} = require("../models/users");
const {errorHandler} = require("./helpers/errorHandler");

class avaliabilityController{
    async getUserAvailablity(req, res){
        console.log("called getUserAvaliablities");
        try{
            const id = req.params.userId;
            const avaliablity = await Availabilty.findOne({user: id});
            const user = await User.findById(id)
            if(!user){
                return res.status(404).send("User Not found");
            }
            console.log("user found");
            if(!avaliablity){
                return res.status(404).send("Avaliablity Not found");
            }
            return res.status(200).json(avaliablity);

        }catch(error){
            errorHandler(req, res, error);
        }
    }

    async createAvailabilty(request, response){
        console.log("Availabilty body: ", request.body);
        const body = request.body
        const id = body.user;
        const user = await User.findById(id);
        if (!user){
            return response.status(404).send("User Not found");
        }
       const  avaliablity = await  Availabilty.findOne({user: id});
       if(avaliablity){
            return response.status(400).send("Avaliablity already exists");
       }
       const newAvaliabliy = new Availabilty({
            user: id,
            availability: body.availability
       });
       await newAvaliabliy.save();
       return response.status(201).send("Created");
    }
    // is send back the updated version of the avalablity.
    async UpdateAvailablity(request, response){
        console.log("Update Avaliablity called: ", request.body);
        const id = request.params.userId;
        const user = await User.findById(id);
        if(!user){
            return response.status(404).send("User not found");
        }
        const updatedAvaliablity = await Availabilty.findOneAndUpdate({user: id}, {availability: request.body.availability}, {new:true});
        if(!updatedAvaliablity){
            return response.status(404).send("Availability not found");
        }
        return response.status(200).json(updatedAvaliablity);
    }
}

module.exports = new avaliabilityController();
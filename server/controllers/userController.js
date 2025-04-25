const {User} = require("../models/users");
const {errorHandler} = require("./helpers/errorHandler");
const mongoose = require("mongoose");
const{Event} = require("../models/event");

class userController{
    async getUsers(req, res){
        try{
            const users = await User.find();
            return res.status(200).json(users);

        }catch(error){
            errorHandler(req, res, error);
        }
    }
    async getUser(request, response){
        try{
            console.log("params are : ", request.params.userId);
            if(!mongoose.Types.ObjectId.isValid(request.params.userId)){
                return response.status(400).send("Not A Vaild UserId Format");
            }
            const user = await User.findById(request.params.userId);
            if(!user){
                return response.status(404).send('Not Found');
            }
            return response.status(200).json(user);


        }catch(error){
            errorHandler(request, response, error);
        }
    }
    async createUser(request, response){
        try{
            console.log("Request body: ", request.body);
            //now i have to create a new user with the mongoose schema 
            const newUser = User({
                fname: request.body.fname,
                lname: request.body.lname,
                age: parseInt(request.body.age),
                profile_pic: "default",
                email: request.body.email,
                bio: null,
                // have to come back and encrypt password
                password: request.body.password,
            });
            await newUser.save()
            return response.status(201).send("created");
        }catch(error){
            errorHandler(request, response, error);
        }
    }

    async updateUser(req, res){
        try {
            const id = req.params.userId;
            const updates = req.body;
    
            const updatedUser = await User.findByIdAndUpdate(
                id,
                updates,
                { new: true, runValidators: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            errorHandler(req, res, error);
        }
    }
}
module.exports = new userController();
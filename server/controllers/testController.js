const {Testy} = require("../models/testSchema");

class testController{
    async getAllUsers(req, res){
        try{
            const users = await Testy.find();
            return res.status(200).json(users);
        }catch(error){
            return res.status(404).send("could not find");
        }
    }
    
    async createUser(req, res){
        console.log("request body: ", req.body);
        try{
            const newuser = new Testy({
                name: req.body.name,
                age: req.body.age,
                email: req.body.email

            });
            await newuser.save();
            res.status(201).send("created");

        }catch(error){
            if(error.errors){
                var errorMesages = {};
                for(var feildname in error.errors){
                    errorMesages[feildname] = error.errors[feildname].message;
                }
                return res.status(422).json(errorMesages);
            }
            else{
                return res.status(400).send("unknown error.")
            }
            
    
        }   
    }
}

module.exports = new testController();
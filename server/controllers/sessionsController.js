const {errorHandler} = require('./helpers/errorHandler');
const {User} = require('../models/users');
const jwt = require('jsonwebtoken');
require("dotenv").config(); 

class sessionsController{
    async login(request, response){
        try{
            // authenticate if the user is who they are by finding the email then matching by the password any issue return the same message
            console.log("Login in body : " ,request.body);
            const emailAttempt = request.body.email;
            const passwordAttempt = request.body.password;
            const user = await User.findOne({email: emailAttempt}).select("+password");
            if(user){
                console.log("user found");
                //match the password from the attempt to the one stored on my data base.
                if(user.password === passwordAttempt){
                    console.log('passwords match');
                    const idObject = {
                        id: user._id
                    };
                    //creating my json web token 
                    const access_token = jwt.sign(idObject, process.env.JWT_SECRET, { expiresIn: '10s' });
                    const refresh_token = jwt.sign(idObject, process.env.JWT_SECRET, { expiresIn: '2m' });
                    // generate the json web token!!
                    //saves it in a cookie on the browser away from the code best protection
                    return response.status(201).json({
                        token: access_token,
                        refrsh: refresh_token,
                        user: user
                    });

                }
                else{
                    console.log(user);
                    console.log("passwords didnt match", user.password, " != ", passwordAttempt);
                    return response.status(404).send("User with that email and password dosnt exists");
                }
            }
            else{
                console.log("User with that email was not found");
                return response.status(404).send("User was not found to login");
            }

        }catch(error){
            errorHandler(request, response, error);
        }
    }
}

// for refresh tokens you need to create a schema and for it and controll it threw a data base fro now the user will have unlimited time
module.exports = new sessionsController();

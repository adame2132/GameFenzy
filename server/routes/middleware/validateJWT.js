const jwt = require('jsonwebtoken');
require("dotenv").config(); 

function validateJWT(request, response, next){
    //token is in the header
    const auth_header = request.headers['authorization'];
    const token = auth_header && auth_header.split(' ')[1];
    console.log('token is : ', token);
    if(!token){
        return response.status(401).send('Not Authorized JWT');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            return response.status(403).send('Invalid Token');
        }
        request.user_id = decoded;
        /// decodes the data save onto the token so the id is in request.user 
        next();
    });
}
module.exports = {
    validateJWT
}
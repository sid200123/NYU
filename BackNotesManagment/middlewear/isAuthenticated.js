const jwt = require("jsonwebtoken")
require("dotenv").config()

const isAuthenticated = async (req, res, next) => {
    try{
         let token = await req.headers.authorization.substring(
            7, // The length of the token prefix Ex:- Bearer nfjsnfjdsnfndsfd (Bearer -> 7)
            req.headers.authorization.length // The total length of the token
        );

        console.log(token)

        if(!token){
            res.status(404).json({
                error: "Token Not Provided"
            })
        }
        
        await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                res.status(404).json({
                    error: "Token expired or invalid"
                })
            }else{

                console.log(user)
    
                next();
            }

        })

    }catch(e){
        console.log(e, "Authentication Error");
        res.status(401).json({error: "Unauthorized"});
    }
}

module.exports = isAuthenticated;

var jwt = require('jsonwebtoken'); //JWT included for security
const JWT_SECRET = "thisISveryImportant@forSecurity";



const fetchorganizer = (req, res, next)=>{


    const token = req.header('auth-token');
    console.log("authToken",token)
    if(!token)
    {
        res.status(401).send({error: "Please authenticate with a valid token"});
    }

    try {

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log(req.user)
        console.log(data.user)
        next();
            
    } 
    
    catch (error) {
            res.status(401).send({error: "Please authenticate with a valid token"});
    }
}

module.exports = fetchorganizer;

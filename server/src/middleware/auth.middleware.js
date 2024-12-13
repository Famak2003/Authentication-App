import jwt from "jsonwebtoken";
export const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // gets cookie's token from the client
    if (!token){ // Checks if there is a token from the browser
        return res.json({Error: "You are Not authorised"})
    }else{ // Checks if there token is the one created by this app
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                return res.json({Error: "Token not found you're not a registered user"})
            } else {
                req.name = decoded.name
                console.log("Decoded name", decoded)
                next();
            }
        })
    }
}
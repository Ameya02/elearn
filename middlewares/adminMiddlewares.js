const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect_admin = async(req, res, next) => {
    let token;
        if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
    {
        try {
            
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = await User.findByPk(decoded.userId,{
                attributes: {exclude: ["password"]},
            
            });
            if(!req.user.isAdmin){
                res.status(401);
                throw new Error("Not authorized, not an admin");
            }
            next();

        } catch (err) {
            throw new Error("Not Authorized, token failed");
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

module.exports = {protect_admin};
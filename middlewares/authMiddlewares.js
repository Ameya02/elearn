const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async(req, res, next) => {
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
            next();

        } catch (err) {
            res.status(401).send("Not authorized");
        }
    }

    if(!token) {
        res.status(401).send("No Token");
    }
};

module.exports = {protect};
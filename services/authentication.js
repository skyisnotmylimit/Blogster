const JWT = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const createTokenForUser = (user)=>{ 
    const payload = {
        _id : user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        role : user.role
    };
    const token = JWT.sign(payload,secret);
    return token;
}

const validateToken = (token)=>{
    const payload = JWT.verify(token,secret);
    return payload;
}
module.exports = {
    createTokenForUser,
    validateToken
};
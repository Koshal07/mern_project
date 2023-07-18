const jwt = require('jsonwebtoken');
const User=require('../model/userSchema'); 

const Authenticate = async(req,res,next) => {
   try{

    const token=req.cookies.jwtoken;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

    const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token}); //user is genuine

    if(!rootUser){
        throw new Error('User Not Found')
    }
    req.token = token;
    req.rootUser=rootUser;
    req.UserID=rootUser._id;

    next();

   }catch(err){
    console.log("checking authenticate get data ");
    res.status(401).send('Unauthorized:No token providedddddddddd');
    console.log(err);
   }
};

module.exports = Authenticate;
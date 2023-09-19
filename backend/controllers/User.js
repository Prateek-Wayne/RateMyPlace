const User=require('../models/User');
const bcrypt=require('bcrypt');
const saltRounds=10;
exports.register=async(req,res)=>{
    try {
    
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
      password=hashedPassword;
       let newUser=await User.create(
        {
         username:req.body.username,
         password:hashedPassword,
         email:req.body.email
        }
       );
       res.status(200).json({
        "success":true,
         newUser
       });

    } catch (error) {
        res.status(500).json({
            "success":false,
            "message":error.message
        })
    }
};
exports.login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username})
        if(!user)
        {
            res.status(401).json({
                "success":false,
                "message":"username OR password is wrong"
            })
        }
        if(password!==user.password)
        {
            res.status(401).json({
                "success":false,
                "message":"username OR password is wrong"
            })
        }
        res.status(200).json({
            "success":true,
            user
        })

    } catch (error) {
        res.status(500).json({
            "success":false,
            "error":error.message
        })
    }
}
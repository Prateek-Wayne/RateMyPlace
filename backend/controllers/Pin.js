const Pin=require('../models/Pin');
exports.createPin=async(req,res)=>{
    try {
       const {username,title,desc,ratings,latitude,longitude}=req.body;
       let newPin=await Pin.create(
        {username,title,desc,ratings,latitude,longitude}
       )
       res.status(200).json({
        "success":true,
        newPin
       });

    } catch (error) {
        res.status(500).json({
            "success":false,
            "message":error
        })
    }
}

exports.getPin=async(req,res)=>{
    try {
        const allPin=await Pin.find();
        res.status(200).json({
            "success":true,
            allPin
        })
    } catch (error) {
        res.status(500).json({
            "success":false,
            "message":error
        })
    }
}
const mongoose=require('mongoose');
const pinSchema=mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:6
    },
    title:{
        type:String,
        require:true,
        min:3,
    },
    desc:{
        type:String,
        require:true
    },

    ratings:{
        type:Number,
        require:true,
        min:0,
        max:5
    },
    latitude:{
        type:Number,
        require:true
    },
    longitude:{
        type:Number,
        require:true
    }
},{timestamps:true});

module.exports=mongoose.model("Pin",pinSchema);
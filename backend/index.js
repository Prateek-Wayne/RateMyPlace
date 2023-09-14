const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const pinRoute=require('./routes/pin');
dotenv.config();

const app=express();
const PORT=5000;
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
});

app.use('/api/v1',pinRoute);
app.listen(PORT,()=>{
    console.log("server started at Port",PORT);
});
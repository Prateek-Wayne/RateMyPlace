const express=require('express');
const mongoose=require('mongoose');
const path=require('path')
const dotenv=require('dotenv');
const pinRoute=require('./routes/pin');
const userRoute=require('./routes/user');
dotenv.config();

const app=express();
const PORT=5000;
app.use(express.json());

mongoose
.connect("mongodb+srv://lordprateekverma:rimFFlND5oxTl9NQ@cluster0.j2bcqvd.mongodb.net/RateMyPlace?retryWrites=true&w=majority")
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
});

app.use('/api/v1/pin/',pinRoute);
app.use('/api/v1/user/',userRoute);
app.use(express.static(path.join("frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend","build","index.html"));
});
app.listen(PORT,()=>{
    console.log("server started at Port",PORT);
    console.log(path.join(__dirname,'/home'));
});
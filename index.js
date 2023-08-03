const express = require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');

app.use(cors());
app.use(bodyparser.json({limit:"50mb"}));
app.use(bodyparser.urlencoded({limit:"50mb",parameterLimit:1000,extended:true}));

dotenv.config({path:"./.env"})
const port= 5000;

mongoose
.connect(process.env.MONGO_DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

app.use("/api/users", require("./routes/userRouter"));
app.use("/api",require("./routes/Crudleadinfo"));
app.use("/api/comm",require("./routes/communication"));
app.use("/api/follow",require("./routes/followup"));

app.listen(port,()=>{
    console.log(`server started at the ${port}`) 
})
 
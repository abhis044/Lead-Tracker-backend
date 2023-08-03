const mongoose=require('mongoose');

const CommunicationhistorySchema = new mongoose.Schema({
    lead_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "leadinfo",
        required: true,
    },
    date_time:{type:String,required:true},
    type:{type:String,required:true},
    content:{type:String,required:true},
},{timestamps:true});

const Comm=mongoose.model("comm",CommunicationhistorySchema );
module.exports=Comm;
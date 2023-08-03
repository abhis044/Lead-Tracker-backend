const mongoose=require('mongoose');

const Followupschema=new mongoose.Schema({
    lead_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"leadinfo",
        required:true,
    },
    description:{type:String,required:true},
    due_date:{type:String,required:true},
    Status:{type:String,required:true,default:"pending"},
});

const Follow=mongoose.model("follow",Followupschema);

module.exports=Follow;
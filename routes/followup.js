const express = require("express");
const router = express.Router();
const Leadinfo = require("../models/Leadinfo");
const Follow=require("../models/Followup");


/*
    @usage : to add new followup
    @url : /api/lead/followup/new
    @fields : id, name , email , password , phone ,sorce
    @method : POST
    @access : admin
*/

router.post("/newfollow",async(req,res)=>{
    try{
        let {leadId,description,due_date,Status}=req.body;
        let lead= await Leadinfo.findOne({_id:leadId});
        console.log(leadId);
        if(!lead){
            return res.status(201).json({msg:"lead not found"});
        }
        let lead_id=lead._id;

        let follow=new Follow({lead_id,description,due_date,Status});
        await follow.save();
        res.status(200).json({msg:"followup schedule entered"});
    }catch(e){
        console.log(e);
        res.status(500).json({msg:e.message});
    }
});

/*
    @usage : to get followups
    @url : /api/lead/followup
    @fields : leadid,date-time,type,content
    @method : get
    @access : private
*/

router.get("/:leadid",async(req,res)=>{
    try{
        let leadId=req.params.leadid;
        let lead=await Leadinfo.findOne({_id:leadId})
        if(!lead){
            return res.status(400).json({msg:"lead not found"});
        }
        leadId=lead._id;
        let follow=await Follow.find({lead_id:leadId}).populate("lead_id",["id","name","email"]);
        if(!follow){
            return res.status(400).json({msg:"no follow scheduled not found"});
        }
        res.status(200).json({follow:follow});
    }catch(e){
        console.log(e);
        res.status(500).json({msg:e.message});
    }
});

/*
    @usage : to get followup
    @url : /api/lead/followup
    @fields : leadid,date-time,type,content
    @method : get
    @access : private
*/
router.get("/followup/:followid",async(req,res)=>{
    try{
        let followId=req.params.followid;
        
        let follow=await Follow.findById(followId).populate("lead_id",["id","name","email"]);
        if(!follow){
            return res.status(400).json({msg:"no follow scheduled not found"});
        }
        res.status(200).json({follow:follow});
    }catch(e){
        console.log(e);
        res.status(500).json({msg:e.message});
    }
});
/*
    @usage : to delete followup
    @url : /api/lead/followup/:followId
    @fields : leadid,date-time,type,content
    @method : delete
    @access : admin
*/

router.delete("/:followId",async(req,res)=>{
    try{
        let followId=req.params.followId;

        let follow=await Follow.findById(followId);
        if(!follow){
            return res.status(400).json({msg:"no followup found"});
        }
        follow=await Follow.findByIdAndRemove(followId);
        res.status(200).json({msg:"followup deleted",follow:follow});
    }catch(e){
        console.log(e);
        res.status(5801).json({msg:e.message});
    }
})

/*
    @usage : to update followup schedueled
    @url : /api/lead/followup/:followId
    @fields : leadid,date-time,type,content
    @method : put
    @access : admin
*/

router.put("/:followId",async(req,res)=>{
    try{
        let followId=req.params.followId;

        let follow=await Follow.findById(followId);
        if(!follow){
            return res.status(400).json({msg:"no followup history"});
        }
        let {description,due_date,status}=req.body;

        let followobj={};
        followobj.description=description;
        followobj.due_date=due_date;
        followobj.status=status;

        follow=await Follow.findByIdAndUpdate(followId,{$set:followobj},{new:true});

        res.status(200).json({msg:"updated followup history",follow:follow})        
    }catch(e){
        console.log(e);
        res.status(5801).json({msg:e.message});
    }
})
module.exports=router;
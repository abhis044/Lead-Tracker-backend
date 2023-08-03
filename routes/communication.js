const express = require("express");
const router = express.Router();
const Leadinfo=require("../models/Leadinfo");
const Comm=require("../models/Communicationhistory");

router.post("/newcomm", async (req, res) => {
    try {
      let { leadId, date_time, type, content } = req.body;
      // console.log(leadId)
      let lead = await Leadinfo.findOne({_id: leadId });
      if (!lead) {
        return res.status(201).json({ msg: "lead not found" });
      }
      let lead_id = lead._id;
    
      let comm = new Comm({ lead_id, date_time, type, content });
      await comm.save();
      res.status(200).json({ msg: "communication history entered" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "something went wrong" });
    }
  });

  router.get("/:leadId", async (req, res) => {
    try {
      let leadId = req.params.leadId;
      console.log(leadId);
      let lead = await Leadinfo.findOne({_id: leadId });
      if (!lead) {
        return res.status(400).json({ msg: "lead not found" });
      }
      leadId = lead._id;
      let comm = await Comm.find({ lead_id: leadId }).populate("lead_id", [
        "id",
        "name",
        "email",
      ]);
      if (!comm) {
        return res.status(400).json({ msg: "communication history not found" });
      }
      res.status(200).json({ comm: comm });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "something went wrong" });
    }
  });
  router.get("/communication/:commid", async (req, res) => {
    try {
      let commId = req.params.commid;
      let comm = await Comm.findById(commId).populate("lead_id", [
        "id",
        "name",
        "email",
      ]);
      if (!comm) {
        return res.status(400).json({ msg: "communication history not found" });
      }
      res.status(200).json({ comm: comm });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "something went wrong" });
    }
  });
  router.delete("/:commId", async (req, res) => {
    try {
      let commId = req.params.commId;
  
      let commhis = await Comm.findById(commId);
      if (!commhis) {
        return res.status(400).json({ msg: "no communication history" });
      }
      commhis = await Comm.findByIdAndRemove(commId);
      res
        .status(200)
        .json({ msg: "Communication history deleted", commhis: commhis });
    } catch (e) {
      console.log(e);
      res.status(5801).json({ msg: e.message });
    }
  });
  router.put("/:commId", async (req, res) => {
    try {
      let commId = req.params.commId;
  
      let commhis = await Comm.findById(commId);
      if (!commhis) {
        return res.status(400).json({ msg: "no communication history" });
      }
      let { date_time, type, content } = req.body;
  
      let commobj = {};
      commobj.date_time = date_time;
      commobj.type = type;
      commobj.content = content;
  
      commhis = await Comm.findByIdAndUpdate(
        commId,
        { $set: commobj },
        { new: true }
      );
  
      res
        .status(200)
        .json({ msg: "updated communication history", commhis: commhis });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "something went wrong" });
    }
  });
  module.exports=router;
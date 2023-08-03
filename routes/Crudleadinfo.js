const express = require('express');
const router = express.Router();
const Leadinfo = require("../models/Leadinfo");

//create leadinfo
router.post("/addlead", async (req, res) => {
    try {
        let { name, email, phone, city, source } = req.body;
        let lead = new Leadinfo({ name, email, phone, city, source });
        await lead.save();
        res.status(200).json({ msg: "Lead created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
    }
})
// {
//     "name":"Abhishek Mittal",
//     "email":"abhishek82904@gmail.com",
//     "phone":"6378395159",
//     "source":"Google"
// }

//update the leadinfo
router.put("/:leadId", async (req, res) => {
    try {
        let { name, email, phone, city, source } = req.body;
        let newobj = {};
        newobj.name = name;
        newobj.email = email;
        newobj.phone = phone;
        newobj.city = city;
        newobj.source = source;
        await Leadinfo.findOneAndUpdate(
            { _id: req.params.leadId },
            { $set: newobj },
            { new: true }
        );
        res.status(200).json({ msg: "Lead updation is success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
    }
})
// Get all the lead
router.get("/", async (req, res) => {
    try {
        let leadinfos = await Leadinfo.find();
        res.status(200).json({ leadinfos: leadinfos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
    }
})
//Get single lead
router.get("/:leadId", async (req, res) => {
    try {
        let lead = await Leadinfo.findById(req.params.leadId);
        res.status(200).json({ lead: lead });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
    }
})
// Delete lead
router.delete("/:leadId", async (req, res) => {
    try {
        await Leadinfo.findByIdAndRemove(req.params.leadId);
        res.status(200).json({ msg: "Lead deleted successfulyy" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong!" });
    }
})
module.exports = router;
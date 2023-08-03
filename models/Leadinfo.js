const mongoose = require('mongoose');

const LeadinfoSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     phone: { type: String, required: true },
     city: { type: String, required: true },
     source: { type: String, required: true },
}, { timestamps: true });

const Leadinfo = mongoose.model("leadinfo", LeadinfoSchema);
module.exports = Leadinfo;
const express = require("express");
const routes = express.Router();
const ComplaintType = require("../models/ComplaintType");

// Register Complaint Type
routes.post("/register", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name)
    if(!name){
      return res.json({"msg":"All fields are mandatory"})
    }
    const c = await ComplaintType.findOne({ name:name });
    if (c) {
      return res.json({ "msg": "Complaint Type Already Exist" });
    }

    const complaint = new ComplaintType({
      name:name,
      status:'active'
    });
    complaint.save();

    return res.json({ "msg": "Complaint Type Registered" });
  } catch (err) {
    console.error(err);
    return res.json({ "msg": "Server Error" });
  }
});

// Show Complaint Types
routes.get("/show", async (req, res) => {
  try {
    const a = await ComplaintType.find({status:["active", "inactive"]});
    return res.json({msg: "Data fetched","complainttype":a});
  } catch (err) {
    console.error(err);
    return res.json({ msg: "Server Error" });
  }
});

// Update
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name} = req.body;
    await ComplaintType.findByIdAndUpdate(id, {name:name});
    return res.json({ msg: "Complaint Type Updated Successfully" });
  } catch (err) {
    console.error(err);
    return res.json({ "msg": "Server Error" });
  }
});

// Delete
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await ComplaintType.findByIdAndUpdate(id, {
      status: "delete",
    });

    return res.json({ "msg": "Complaint Type Deleted" });
  } catch (err) {
    console.error(err);
    return res.json({ "msg": "Server Error" });
  }
});

// Active Complaint Types
routes.get("/active", async (req, res) => {
  try {
    const data = await ComplaintType.find({
      status: "active",
    });

    return res.json({
      "msg": "Complaint Types fetched",
      "complainttype": data,
    });
  } catch (err) {
    console.error(err);
    return res.json({ "msg": "Server Error" });
  }
});

// Change type
routes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await ComplaintType.findByIdAndUpdate(id, {
      name:name
    });

    return res.json({ msg: "Status Updated" });
  } catch (err) {
    console.error(err);
    return res.json({ "msg": "Server Error" });
  }
});

module.exports = routes;
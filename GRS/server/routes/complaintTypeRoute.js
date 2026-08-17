const express = require('express');
const ComplaintType = require('../models/ComplaintType');
const routes = express.Router();


// register api
routes.post("/register", async (req, res) => {
  try {
    const { name, description } = req.body;

     if(!name || !description){
      return res.json({"msg" : "All fields are required"});
    }

    const c = await ComplaintType.findOne({ name: name });

    if (c) {
      return res.json({ "msg": "ComplaintType already exist" });
    }

    const clg = await new ComplaintType({
      name: name,
      description: description,
      status: "active",
    });
    clg.save();
    return res.json({ "msg": "ComplaintType Registered" });
  } catch (error) {
    console.error(error);
    return res.json({"msg" : "Server error"});
  }
}); 

// show api
routes.get("/show", async(req, res) => {
  try {
    const a = await ComplaintType.find({status: ['active', 'inactive']});
    return res.json({
      "msg" : "Data fetched",
    "complaintType" : a});
    
  } catch (error) {
    console.error(error);
    return res.json({
      "msg" : "Server error"
    })
  }
});

//update api
routes.put("/:id", async(req, res) => {
  try {
      const {id} = req.params;
      const {name, description} = req.body;
      await ComplaintType.findByIdAndUpdate(id, {
        name : name,
        description : description
      });
      return res.json({"msg" : "ComplaintType Updated Successfully"});
    
  } catch (error) {
      console.error(error);
      return res.json({"msg" : "Server error"});
      
  }
})

//delete api
routes.delete("/:id", async(req, res) => {
  try {

      const {id} = req.params;
      const data = await ComplaintType.findByIdAndUpdate(id, {status : "delete"});
      return res.json({
        "msg" : "ComplaintType Deleted"
      });
    
  } catch (error) {

      console.error(error);
      return res.json({
        "msg" : "Server error"
      });
      
  }
});

// api for register page of active ComplaintTypes
routes.get('/active', async(req, res) => {
  try {
    
      const data = await ComplaintType.find({status : "active"});
      return res.json({"msg" : "ComplaintType fetched", "ComplaintType" : data });

  } catch (error) {

      console.error(error);
      return res.json({
        "msg" : "Server error"
      });
      
  }
});

// block/unblock status api
routes.patch("/:id", async(req, res) =>{
  try {

      const {id} = req.params;
      const {status} = req.body;
      await ComplaintType.findByIdAndUpdate(id, {status : status});
      return res.json({
        "msg" : "Status updated"
      });;

  } catch (error) {
    
       console.error(error);
      return res.json({
        "msg" : "Server error"
      });

  }
});

module.exports = routes;
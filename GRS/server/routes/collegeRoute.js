const express = require("express");
const College = require("../models/College");
const routes = express.Router();

// register api
routes.post("/register", async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if(!name || !description){
      return res.json({"msg" : "All fields are required"});
    }

    const c = await College.findOne({ name: name });
    if (c) {
      return res.json({ "msg": "College already exist" });
    }

    const clg = await new College({
      name: name,
      description: description,
      status: "active",
    });
    clg.save();
    return res.json({ "msg": "College Registered" });
  } catch (error) {
    console.error(error);
    return res.json({"msg" : "Server error"});
  }
});

// show api
routes.get("/show", async(req, res) => {
  try {
    const a = await College.find({status: ['active', 'inactive']});
    return res.json({
      "msg" : "Data fetched",
    "college" : a});
    
  } catch (error) {
    console.error(error);
    return res.json({
      "msg" : "Server"
    })
  }
});

//update api
routes.put("/:id", async(req, res) => {
  try {
      const {id} = req.params;
      const {name, description} = req.body;
      await College.findByIdAndUpdate(id, {
        name : name,
        description : description
      });
      return res.json({"msg" : "College Updated Successfully"});
    
  } catch (error) {
      console.error(error);
      return res.json({"msg" : "Server error"});
      
  }
})

//delete api
routes.delete("/:id", async(req, res) => {
  try {

      const {id} = req.params;
      const data = await College.findByIdAndUpdate(id, {status : "delete"});
      return res.json({
        "msg" : "College Deleted"
      });
    
  } catch (error) {

      console.error(error);
      return res.json({
        "msg" : "Server error"
      });
      
  }
});

// api for register page of active colleges
routes.get('/active', async(req, res) => {
  try {
    
      const data = await College.find({status : "active"});
      return res.json({"msg" : "college fetched", "college" : data });

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
      await College.findByIdAndUpdate(id, {status : status});
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

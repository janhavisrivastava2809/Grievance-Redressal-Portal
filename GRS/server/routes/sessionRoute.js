const express = require('express');
const routes = express.Router();
const Session = require('../models/Session')

//register api
routes.post("/register", async (req, res) => {
  try {
    const { name,  } = req.body;

     if(!name){
      return res.json({"msg" : "All fields are required"});
    }

    const c = await Session.findOne({ name: name });
    if (c) {
      return res.json({ "msg": "Session already exist" });
    }

    const clg = await new Session({
      name: name,
      status: "active",
    });
    clg.save();
    return res.json({ "msg": "Session Registered" });
  } catch (error) {
    console.error(error);
    return res.json({"msg" : "Server error"});
  }
});


// show api
routes.get("/show", async(req, res) => {
  try {
    const a = await Session.find({status: ['active', 'inactive']});
    return res.json({
      "msg" : "Data fetched",
    "session" : a});
    
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
      const {name, } = req.body;
      await Session.findByIdAndUpdate(id, {
        name : name,
      });
      return res.json({"msg" : "Session Updated Successfully"});
    
  } catch (error) {
      console.error(error);
      return res.json({"msg" : "Server error"});
      
  }
})

//delete api
routes.delete("/:id", async(req, res) => {
  try {

      const {id} = req.params;
      const data = await Session.findByIdAndUpdate(id, {status : "delete"});
      return res.json({
        "msg" : "Session Deleted"
      });
    
  } catch (error) {

      console.error(error);
      return res.json({
        "msg" : "Server error"
      });
      
  }
});

// api for register page of active Sessions
routes.get('/active', async(req, res) => {
  try {
    
      const data = await Session.find({status : "active"});
      return res.json({"msg" : "Session fetched", "Session" : data });

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
      await Session.findByIdAndUpdate(id, {status : status});
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
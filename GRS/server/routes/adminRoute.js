const express = require("express");
const routes = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");

// admin register code
routes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

     if(!name || !email || !password){
      return res.json({"msg" : "All fields are required"});
    }
    //check admin exist or not
    const isExist = Admin.countDocuments();
    if (isExist > 0) {
      return res.json({ msg: "Admin already Register" });
    }
    // check admin
    const user = await Admin.findOne({ email: email });
    if (user) {
      return res.json({ msg: "Admin already Register" });
    }
    const a = await new Admin(req.body);
   a.save();
    res.json({ msg: "Admin register successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Admin not register" });
  }
});

// admin login
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ msg: "Email not entered" });
    }
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return res.json({ msg: "Email not found" });
    }
    if (user.password === password) {
      const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {'expiresIn' : '1d'});
         res.json({"msg" : "success",
        "adminId" : user._id,
        "name" : user.name,
        "token" : token
      });
    }
    else{
      return res.json({"msg" : "Invalid password"})
    }

  } catch (error) {
    console.log(error);
  }
});

// Change Admin Password
routes.patch("/password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.json({
        msg: "All fields are required",
      });
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.json({
        msg: "Admin not found",
      });
    }

    if (admin.password !== oldPassword) {
      return res.json({
        msg: "Old password is incorrect",
      });
    }

    if (oldPassword === newPassword) {
      return res.json({
        msg: "Old password and new password cannot be the same",
      });
    }

    admin.password = newPassword;

    await admin.save();

    return res.json({
      msg: "Password changed successfully",
    });

  } catch (error) {
    console.log(error);

    return res.json({
      msg: "Server error",
    });
  }
});

module.exports = routes;

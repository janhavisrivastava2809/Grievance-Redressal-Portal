const express = require('express');
const User = require('../models/User');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: "uploads/profile",

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//register api
routes.post("/register", async (req, res) => {
  try {
      const {
        name, 
        father,
        email,
        mobile,
        gender,
        dob,
        password,
        sessionId,
        collegeId,
        course,
        enrollment,
        address
      } = req.body;

      if(!name || !father || !email || !mobile || !gender || !dob || !password || !sessionId || !collegeId || !course || !enrollment || !address){
        return res.json({"msg" : "All fields are required"});
      }

      const isExist = await User.findOne({email : email});
      if(isExist){
        return res.json({"msg" : "Email already registered"});
      }

      const isEnroll = await User.findOne({enrollment : enrollment});
      if(isEnroll){
        return res.json({"msg" : "Enrollment already registered"});
      }  

      const a = await new User({
        name : name,
        father : father,
        email : email,
        mobile : mobile,
        gender : gender,
        dob : dob,
        password : password,
        sessionId : sessionId,
        collegeId : collegeId,
        course : course,
        enrollment : enrollment,
        address : address,
        status : "active"
      });

       a.save();
      return res.json({"msg" : "Registered successfully"});

  } catch (error) {
      console.log(error);
      res.json({"msg" : "Server error"});
  }
});

// admin api to show users
routes.get("/show", async (req, res) => {
  try {

    const data = await User.find({
      status: { $in: ["active", "inactive"] }
    })
      .populate("collegeId")
      .populate("sessionId");

    return res.json({
      msg: "Users fetched",
      user: data
    });

  } catch (error) {

    console.log(error);

    return res.json({
      msg: "Server error"
    });

  }
});

// get user by id
routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("sessionId")
      .populate("collegeId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
});

//api for user login
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ msg: "Email not entered" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ msg: "Email not found" });
    }
    if (user.password === password) {
      const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {'expiresIn' : '1d'});
         res.json({"msg" : "success",
        "userId" : user._id,
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

// view profile for particular student
routes.get('/profile/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const data = await User.findById(id);
    return res.json(json({
      msg : "User fetched",
      user : data
    }));
    
  } catch (error) {
      console.log(error);
      res.json({"msg" : "Server error"});
  }
});

// PATCH: Update User Profile
routes.patch( "/update-profile/:id",
  upload.single("profile"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Update profile fields
      Object.assign(user, req.body);

      // Update profile image
      if (req.file) {
        user.profile = req.file.filename;
      }

      await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });

    } catch (error) {
      res.status(500).json({
        message: "Error updating profile",
        error: error.message,
      });
    }
  }
);

// api for user delete only by admin
routes.delete("/:id", async(req, res) => {
  try {

      const {id} = req.params;
      const data = await User.findByIdAndUpdate(id, {status : "delete"});
      return res.json({
        "msg" : "User Deleted"
      });
    
  } catch (error) {

      console.error(error);
      return res.json({
        "msg" : "Server error"
      });
      
  }
});

// block and unblock status api  for user
routes.patch("/:id", async(req, res) =>{
  try {

      const {id} = req.params;
      const {status} = req.body;
      await User.findByIdAndUpdate(id, {status : status});
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

// change password api 
routes.patch("/password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      oldPassword,
      newPassword,
      confirmPassword
    } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.json({
        msg: "All fields are required",
      });
    }

    if (oldPassword === newPassword) {
      return res.json({
        msg: "Old password and new password cannot be the same",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.json({
        msg: "New password and confirm password do not match",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.json({
        msg: "User not found",
      });
    }

    if (oldPassword !== user.password) {
      return res.json({
        msg: "Old password is incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    return res.json({
      msg: "Password changed successfully",
    });

  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});




module.exports = routes;
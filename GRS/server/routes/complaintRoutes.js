const express = require("express");
const Complaint = require("../models/Complaints");

const routes = express.Router();

// add complaint api
routes.post("/add", async (req, res) => {
  try {
    const { cmpTId, userId, description, status, cmpStatus } = req.body;

    if (!cmpTId || !userId || !description) {
      return res.json({
        msg: "All fields are required",
      });
    }

    const c = await Complaint.findOne({
      cmpTId: cmpTId,
      userId: userId,
      description: description,
      status: { $ne: "delete" },
    });

    if (c) {
      return res.json({
        msg: "Complaint already exist",
      });
    }

    const complaint = await new Complaint({
      cmpTId: cmpTId,
      userId: userId,
      description: description,
      status: "active",
      cmpStatus: "notProcessed",
    });

    await complaint.save();

    return res.json({
      msg: "Complaint Registered",
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

// show api
routes.get("/show", async (req, res) => {
  try {

    const data = await Complaint.find({
      status: { $in: ["active", "inactive"] }
    }).populate('cmpTId').populate('userId')

    return res.json({
      msg: "Data fetched",
      complaint: data
    });

  } catch (error) {

    console.error(error);

    return res.json({
      msg: "Server error"
    });

  }
});

// show complaint of particular user
routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        msg: "User ID is required",
      });
    }

    const data = await Complaint.find({
      userId: id,
      status: { $in: ["active", "inactive"] },
    }).populate('cmpTId');

    return res.json({
      msg: "User Complaint fetched",
      complaint: data,
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

// update complaint api
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { cmpTId, description } = req.body;

    if (!cmpTId || !description) {
      return res.json({
        msg: "All fields are required",
      });
    }

    await Complaint.findByIdAndUpdate(id, {
      cmpTId: cmpTId,
      description: description,
    });

    return res.json({
      msg: "Complaint Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

// delete complaint api
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Complaint.findByIdAndUpdate(id, {
      status: "delete",
    });

    return res.json({
      msg: "Complaint Deleted",
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

// active complaint api
routes.get("/active", async (req, res) => {
  try {
    const data = await Complaint.find({
      status: "active",
    });

    return res.json({
      msg: "Complaint fetched",
      Complaint: data,
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

// block/unblock complaint api
routes.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Complaint.findByIdAndUpdate(id, {
      status: status,
    });

    return res.json({
      msg: "Status updated",
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

// update complaint processing status api
routes.patch("/complaint-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { cmpStatus } = req.body;

    if (!cmpStatus) {
      return res.json({
        msg: "Complaint status is required",
      });
    }

    await Complaint.findByIdAndUpdate(id, {
      cmpStatus: cmpStatus,
    });

    return res.json({
      msg: "Complaint Status updated",
    });
  } catch (error) {
    console.error(error);

    return res.json({
      msg: "Server error",
    });
  }
});

module.exports = routes;

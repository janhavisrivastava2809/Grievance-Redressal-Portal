const express = require("express");
const dotenv = require("dotenv");
const mongoDB = require("./config/db");
const cors = require('cors');
const path = require("path");

dotenv.config(); // .env config

const app = express(); // server call
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());// cors call
mongoDB(); // db call

// for image
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// api start
app.use("/api/admin", require('./routes/adminRoute'));
app.use("/api/college", require('./routes/collegeRoute'));
app.use("/api/session", require('./routes/sessionRoute'));
app.use("/api/complaintType", require('./routes/complaintTypeRoute'));
app.use("/api/user", require('./routes/userRoute'));
app.use("/api/complaints", require('./routes/complaintRoutes'));
app.use("/api/discussion",require('./routes/discussionForumRoutes'))
// api end

app.listen(PORT, () => {
  console.log("Server started at http://localhost:5000");
});

const mongoose = require('mongoose');

const complaintTypeSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  status : {
    type : String,
    reuqired : true,
    enum : ["active", "inactive", "delete"]
  }
},{
  timestamps : true
});

module.exports = mongoose.model("ComplaintType", complaintTypeSchema);
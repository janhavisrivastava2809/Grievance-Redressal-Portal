const mongoose = require('mongoose');


const complaintSchema = mongoose.Schema({
  cmpTId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "ComplaintType",
    required : true
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  description : {
    type : String,
    required : true
  },
  status : {
    type : String,
    enum : ['active','inactive', 'delete'],
    required : true,
    default : 'active'
  },
  cmpStatus : {
    type : String,
    enum : ['notProcessed', 'pending', 'closed'],
    required : true,
    deafult : 'notProcessed'
  }
},{
  timestamps : true
});

module.exports = mongoose.model('Complaint', complaintSchema);
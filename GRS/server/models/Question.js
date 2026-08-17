const mongoose = require('mongoose');

 const questionSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  question : {
    type : String,
    required : true
  },
  status : {
    type : String,
    enum : ['active', 'inactive', 'delete'],
    required : true,
    default : 'active'
  }
 },{
  timestamps : true
 });

 module.exports = mongoose.model("Question", questionSchema);
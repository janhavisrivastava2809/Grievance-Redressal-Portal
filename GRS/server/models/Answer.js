const mongoose =  require('mongoose');

const answerSchema = mongoose.Schema({
questionId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'Question',
  required : true
},
userId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'User',
  required : true
},
answer : {
  type : String,
  require : true
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

module.exports = mongoose.model('Answer', answerSchema);                                                       
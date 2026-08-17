const express = require('express');
const routes = express.Router();
const Question =  require('../models/Question');
const Answer = require('../models/Answer')

// api for question register
routes.post('/question', async (req, res) => {
try {
  const { userId, question} = req.body;

  if(!userId || !question){
    return res.json({
      msg : "All fields are required"
    });
  }
  const a = await new Question({
    userId ,
    question ,
    status : 'active'
  });
  a.save();
  return res.json({
    msg : "question registered",
  });

} catch (error) {
   console.log(eror);
   return res.json({msg : "Server error"});
   
}
});

// fetch all question 
routes.get('/show', async(req, res) => {
  try {
      const data = await Question.find({status : ['active', 'inactive']}).populate('userId','name')
      return res.json({
        msg : "question fetched",
        question : data
      });
  } catch (error) {
       console.log(eror);
      return res.json({msg : "Server error"});
   
  }
});

// answer question for anyone
routes.post("/answer", async (req, res) =>{
  try {
    const{ questionId, userId, answer} = req.body;

    if(!questionId || !userId || !answer)
    {
      return res.json({msg : "All fields are required"});
    }

    const data = await new Answer({
      questionId : questionId,
      userId : userId,
      answer : answer,
      status : 'active'
    });
    data.save();

    return res.json({
      msg : 'answer registered'
    });

  } catch (error) {
      console.log(eror);
      return res.json({msg : "Server error"});
  }
});

// api for all answer of a particular question
routes.get('/answer/:id', async(req, res) => {
  try {
     
    const {id} = req.params;
    const data = await Answer.find({questionId : id}).populate('userId', 'name').populate('questionId', 'question');

    return res.json({msg : "all answer fetched",
      answer : data
    });

  } catch (error) {
      console.log(eror);
      return res.json({msg : "Server error"});
  }
})

module.exports = routes;
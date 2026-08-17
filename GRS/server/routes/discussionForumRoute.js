const express = require('express')
const routes = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer')
// for question register api 
routes.post('/question',async(req,res)=>{
    try{ 
        const {userId , question} = req.body
        if(!userId || !question){
            return res.json({"msg":"All fields are required"})
        }
        const a = await new Question({
            userId:userId,
            question:question,
            status:'active'
        });
        a.save();
        return res.json({"msg":"Question Registered"})
    }catch(er){
            console.log(er);
            return res.json({"msg":"Server Error"})
            
    }
})

// fetch all question for admin api
routes.get('/show',async(req,res)=>{
    try{
        const data = await Question.find({status:['active','inactive']}).populate('userId','name')
        return res.json({"msg":"data fetched",question:data})

    }catch(er){
        console.log(er);
        return res.json({"msg":"Server Error"})
        
    }
})

// answer api for any question
routes.post('/answer',async(req,res)=>{
    try{
        const {questionId , userId , answer} = req.body;
        if(!questionId || !userId || !answer){
            return res.json({"msg":"all fields are required"})
        }
        const data = await new Answer({
            questionId:questionId,
            userId:userId,
            answer:answer,
            status:'active'
        });
        data.save();
        return res.json({"msg":"Answer added"})
    }
    catch(er){
        console.log(er);
        return res.json({"msg":"Server Error"})
        
    }
})
// fetch all answer by question id
routes.get('/answer/:id',async(req,res)=>{
    try{
            const {id} = req.params;
            const data = await Answer.find({questionId:id}).populate('questionId','question').populate('userId','name +')
            return res.json({"msg":"data fetched",answer:data})
    }catch(er){
        console.log(er)
        return res.json({"msg":"Server Error"})

    }
})
module.exports = routes
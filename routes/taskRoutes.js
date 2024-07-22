const express = require('express');
const router = express();
const Task = require('./../models/Task');

 // POST Task
 router.post('/', async(req,res) =>{
    try{
        const taskData = req.body;
        const task = new Task(taskData);
        const savedTask = await task.save();
        console.log('Task Saved');
        res.status(201).json(savedTask);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


 // GET Task
 router.get('/', async(req, res) =>{
    try{
        const data = await Task.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }
});

module.exports = router;
import express from "express";
import mongoose from "mongoose";
import Job from "./models/job.js";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

const port=8080;

mongoose.connect('mongodb://127.0.0.1:27017/job-posting' , {
    autoIndex:true
}).then(()=>
    {
        console.log('Mongoos connected');

        app.listen(port,()=>{
            console.log(`server is started at port ${port}`)
        })
    })
.catch((err)=>console.log(err));

app.post('/jobs', async (req,res)=>{
    try{
       
        const jobs=req.body;

        if(Array.isArray(jobs)){
            const createJobs=await Job.insertMany(jobs);
            res.status(201).json(createJobs);
        }
        else{
            const createJob=await jobs.save();
            res.status(201).json(createJob);
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message})
    }
});

app.put('/jobs/:id', async (req, res)=>{
    try{
        const updatedData=req.body;
        const updatedJob=await Job.findByIdAndUpdate(req.params.id,updatedData);
        if(!Job) return res.status(404).json({message:'job not found'});
        res.json(updatedJob);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});


app.delete('/jobs/:id' , async (req,res)=>{
    try{
        const DeleteJob=await Job.findByIdAndUpdate(req.params.id);
        if(!DeleteJob) return res.status(404).json({message:'job not found'});
        res.json({message:'job deleted successfully'});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

app.get('/jobs' , async (req,res)=>{
    try{
        
        const jobs=await Job.find();
        res.json(jobs);
        console.log(jobs);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})


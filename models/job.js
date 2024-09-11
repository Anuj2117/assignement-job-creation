import mongoose from "mongoose";

const JobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    postedData:{
        type:Number,
        default:Date.now,
    },
})
export default mongoose.model('job',JobSchema);
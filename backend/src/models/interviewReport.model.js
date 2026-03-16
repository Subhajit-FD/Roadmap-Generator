import mongoose from "mongoose";

const questionSchema = new mongoose.schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    }
},{_id:false});

const skillGapSchema = new mongoose.schema({
    skill:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:["Low","Medium","High"],
        required:true
    }
},{_id:false});

const preparationPlanSchema = new mongoose.schema({
    date:{
        type:number,
        required:true
    },
    focus:{
        type:String,
        required:true
    },
    tasks:[{
        type:String,
        required:true
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[questionSchema],
    behavioralQuestions:[questionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
},{timestamps:true})

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);
export default InterviewReport;
import { jobModel } from "../../../DB/Models/job.model.js";
import { asyncHandler } from "../../utils/errorhandling.js";






// ===================== create job ====================


export const createJob = asyncHandler((req,res,next)=>{
const{title,address,hiringType,qualifications}=req.body

const job = jobModel.create({title,address,hiringType,qualifications,createdBy:req.user.company})

})
// ==================== apply for job ==================
export const applyForJob = asyncHandler((req,res,next)=>{

const {jobId} = req.query
const {name , nationalNumber ,graduationDate} = req.query



})
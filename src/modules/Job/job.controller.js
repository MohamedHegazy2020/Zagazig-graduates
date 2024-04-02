import { jobModel } from "../../../DB/Models/job.model.js";
import { asyncHandler } from "../../utils/errorhandling.js";

// ===================== create job ====================

export const createJob = asyncHandler(async (req, res, next) => {
  const { title, address, hiringType, qualifications } = req.body;

  const job = await jobModel.create({
    title,
    address,
    hiringType,
    qualifications,
    createdBy: req.authUser._id,
  });

  res.status(201).json({ message: "Done", job });
});

// ==================== get all jobs ====================

export const getAllJobs = asyncHandler(async (req, res, next) => {
  const allJobs = await jobModel.find().populate("companyUser").populate("candidates");
  return res.status(200).json({ message: "Done", allJobs });
});

// ==================== apply for job ==================
export const applyForJob = asyncHandler(async(req, res, next) => {
  const { jobId } = req.params;
  const appliedJob = await jobModel.findById(jobId)


  if(!appliedJob){
    return next(new Error('in-valid job id' ,{cause:404}))
  }


  appliedJob.candidatesIds.push(req.authUser._id)
  await  appliedJob.save()
return res.status(200).json({message:"Done" , appliedJob})


});


// ====================== delete job ========================



export const deleteJob = asyncHandler(async (req,res,next)=>{
    const { jobId } = req.params;
    const deletedJob = await jobModel.findOneAndDelete({_id:jobId , createdBy:req.authUser._id})


    if(!deletedJob){
      return next(new Error('in-valid job id' ,{cause:404}))
    }

    return res.status(200).json({message:"Done" , deletedJob})

})

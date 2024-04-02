import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";
// ====================== create job =================
export const createJobSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    address: Joi.string().required(),
    hiringType: Joi.string().valid("remote", "on-site", "hybrid").required(),
    qualifications: Joi.array().items(Joi.string()).required(),
  }).required(),
};


// ============================ apply for Job ===================


export const applyForJobSchema = {
    params:Joi.object({
        jobId:generalFields._id.required()
    }).required()
  };


//   ========================== delete job =================



export const deleteJobSchema = {
    params:Joi.object({
        jobId:generalFields._id.required()
    }).required()
  };
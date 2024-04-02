import { Router } from "express";
import { isAuth } from "../../middlewares/auth.js";
import { jobRules } from "./job.endpoints.js";
import { validationCoreFunction } from "../../middlewares/validation.js";
import * as jobSchema from './job.validationSchemas.js'
import * as jobController from './job.controller.js'
  const router =Router()

  router.post("/createJob" ,isAuth(jobRules.createJob) ,validationCoreFunction(jobSchema.createJobSchema),jobController.createJob)
  router.get("/getAllJobs" ,jobController.getAllJobs)
  router.patch("/applyForJob/:jobId" ,isAuth(jobRules.applyForJob) ,validationCoreFunction(jobSchema.applyForJobSchema),jobController.applyForJob)
  router.delete("/deleteJob/:jobId" ,isAuth(jobRules.deleteJob) ,validationCoreFunction(jobSchema.deleteJobSchema),jobController.deleteJob)





  export default router
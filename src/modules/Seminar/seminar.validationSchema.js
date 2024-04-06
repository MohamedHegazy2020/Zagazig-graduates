import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";

export const createSeminar = {
  body: Joi.object({
    title: Joi.string().min(5).max(20).required(),
    appointment: Joi.date().required(),
    description: Joi.string().min(10).max(50).required(),
    maxNumOfAttendants: Joi.number().required(),
    instructorName: Joi.string().required(),
    instructorJobTitle: Joi.string().required(),
    instructorAchivements: Joi.string().required(),
  }).required(),
};

export const applyForSeminar = {
  params: Joi.object({
    seminarId: generalFields._id,
  }),
};

export const deleteSeminar = {
  params: Joi.object({
    seminarId: generalFields._id,
  }),
};

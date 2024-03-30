import mongoose from "mongoose";
import { userModel } from "./user.model.js";
import { systemRoles } from "../../src/utils/systemRoles.js";

export const graduatedModel = userModel.discriminator(
  systemRoles.GRADUATED,
  new mongoose.Schema({
    nationality: {
      type: String,
      required: true,
    },
    nationalNumber: {
      type: String,
      required: true,
      unique: true,
    },
    universityEmail: {
      type: String,
      required: true,

      unique: true,
    },

    college: {
      name: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      graduationDate: {
        type: String,
        required: true,
      },
    },

    postGraduateCourses: [
      {
        type: String,
        required: true,
      },
    ],
    job: {
      title: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },

      cv: {
        secure_url: String,
        public_id: String,
      },
    },
  })
);

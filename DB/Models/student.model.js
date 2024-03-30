import mongoose from "mongoose";
import { userModel } from "./user.model.js";
import { systemRoles } from "../../src/utils/systemRoles.js";

export const studentModel = userModel.discriminator(
  systemRoles.STUDENT,
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
    },
  })
);

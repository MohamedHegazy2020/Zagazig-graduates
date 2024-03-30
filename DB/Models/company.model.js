import mongoose from "mongoose";
import { systemRoles } from "../../src/utils/systemRoles.js";
import { userModel } from "./user.model.js";

const companyModel = userModel.discriminator(
  systemRoles.COMPANY,
  new mongoose.Schema({
    companyName: { type: String, required: true },
  })
);

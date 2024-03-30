import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId },
  address: { type: String },
  hiringType: { type: String, enum: ["remote", "on-site", "hybrid"] },
  qualifications: [{ type: String, required: true }],
});

export const jobModel =
  mongoose.model("Job", jobSchema) || mongoose.models("Job");

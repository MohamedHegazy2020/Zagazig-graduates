import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String },
    hiringType: { type: String, enum: ["remote", "on-site", "hybrid"] },
    qualifications: [{ type: String, required: true }],
    candidatesIds:[{type:Schema.Types.ObjectId, ref: "User"}]
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
jobSchema.virtual("companyUser", {
  ref: "User",
  localField: "createdBy",
  foreignField: "_id",
});
jobSchema.virtual("candidates", {
  ref: "User",
  localField: "candidatesIds",
  foreignField: "_id",
  justOne:false
});
export const jobModel =
  mongoose.model("Job", jobSchema) || mongoose.models("Job");

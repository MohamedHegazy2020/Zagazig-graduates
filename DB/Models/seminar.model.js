import mongoose, { model } from "mongoose";

const seminarSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    appointment: { type: Date, required: true },
    description: String,
    maxNumOfAttendants: { type: Number, required: true, default: 30 },
    customId: String,
    numOfAttendants: {
      type: Number,
      default: 1,
      validate: {
        validator: function (v) {
          return v <= this.maxNumOfAttendants;
        },
        message: (props) =>
          `number od attendants must be less than or equal to ${this.maxNumOfAttendants}`,
      },
    },
    instructor: {
      name: { type: String, required: true },
      jobTitle: { type: String, required: true },
      profilePicture: {
        secure_url: String,
        public_id: String,
      },
      achivements: { type: String },
    },
  },
  { timestamps: true }
);

export const seminarModel =
  model("Seminar", seminarSchema) || mongoose.models("Seminar");

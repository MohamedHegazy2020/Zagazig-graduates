import { hashSync } from "bcrypt";
import mongoose from "mongoose";
import { systemRoles } from "../../src/utils/systemRoles.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },

    customId: String,

    role: {
      type: String,
      default: systemRoles.ADMIN,
      enum: [
        systemRoles.ADMIN,
        systemRoles.STUDENT,
        systemRoles.GRADUATED,
        systemRoles.COMPANY,
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: [
      {
        type: String,
        required: true,
      },
    ],
    profilePicture: {
      secure_url: String,
      public_id: String,
    },
    status: {
      type: String,
      default: "Offline",
      enum: ["Online", "Offline"],
    },
    isSoftDeleted: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: "Not specified",
      enum: ["male", "female", "Not specified"],
    },
    age: Number,
    token: String,
    forgetCode: String,
  },
  {
    timestamps: true,
    discriminatorKey: "modelType",
  }
);

// hooks

userSchema.pre("save", function (next, hash) {
  // console.log(this.password);
  this.password = hashSync(this.password, +process.env.SALT_ROUNDS);
  // console.log(this.password);

  next();
});

export const userModel =
  mongoose.model("User", userSchema) || mongoose.models("User");

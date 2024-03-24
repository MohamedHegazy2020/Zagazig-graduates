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
    role: {
      type: String,
      default: systemRoles.USER,
      enum: [
        systemRoles.ADMIN,
        systemRoles.SUPER_ADMIN,
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

    // ============================== fields for student and graduates =====================
    nationality: {
      type: String,
      required: function () {
        return this.role === systemRoles.STUDENT || systemRoles.GRADUATED;
      },
    },
    nationalNumber: {
      type: String,
      required: function () {
        return this.role === systemRoles.STUDENT || systemRoles.GRADUATED;
      },
      unique: true,
    },
    universityEmail: {
      type: String,
      required: function () {
        return this.role === systemRoles.STUDENT || systemRoles.GRADUATED;
      },
      unique: true,
    },

    college: {
      name: {
        type: String,
        required: function () {
          return this.role === systemRoles.STUDENT || systemRoles.GRADUATED;
        },
      },
      department: {
        type: String,
        required: function () {
          return this.role === systemRoles.STUDENT || systemRoles.GRADUATED;
        },
      },
      startDate: {
        type: String,
        required: function () {
          return this.role === systemRoles.STUDENT || systemRoles.GRADUATED;
        },
      },
      graduationDate: {
        type: String,
        required: function () {
          return this.role === systemRoles.GRADUATED;
        },
      },
    },

    // for graduates only
    postGraduateCourses: [
      {
        type: String,
      },
    ],
    job: {
      title: {
        type: String,
        required: function () {
          return this.role === systemRoles.GRADUATED;
        },
      },
      companyName: {
        type: String,
        required: function () {
          return this.role === systemRoles.GRADUATED;
        },
      },

      cv: {
        secure_url: String,
        public_id: String,
      },
    },

    // ==================================== end of students and graduates =====================

    token: String,
    forgetCode: String,
  },
  {
    timestamps: true,
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

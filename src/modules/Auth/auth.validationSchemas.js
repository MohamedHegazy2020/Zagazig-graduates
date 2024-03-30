import Joi from "joi";
import { systemRoles } from "../../utils/systemRoles.js";
import { generalFields } from "../../middlewares/validation.js";
// ================================== sign up schemas ==============================
export const signUpSchema = {
  body: Joi.object({
    userName: Joi.string().lowercase().required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    address: Joi.array().items(Joi.string()).required(),
    gender: Joi.string()
      .valid("male", "female", "Not specified")
      .default("Not specified")
      .optional(),
    age: Joi.number(),
    phoneNumber: Joi.string()
      .regex(/^01[0125][0-9]{8}$/)
      .required(),
    role: Joi.string()
      .valid(
        systemRoles.ADMIN,
        systemRoles.GRADUATED,
        systemRoles.STUDENT,
        systemRoles.SUPER_ADMIN
      )
      .required(),
    nationality: Joi.string().when("role", {
      is: systemRoles.STUDENT || systemRoles.GRADUATED,
      then: Joi.string().required(),
    }),
    nationalNumber: Joi.string().when("role", {
      is: systemRoles.STUDENT || systemRoles.GRADUATED,
      then: Joi.string().length(14).required(),
    }),
    universityEmail: Joi.string().when("role", {
      is: systemRoles.STUDENT || systemRoles.GRADUATED,
      then: Joi.string()
        .regex(/^\d{14}@fci\.zu\.edu\.eg$/)
        .required(),
    }),
    college: Joi.object({
      name: Joi.string().when("role", {
        is: systemRoles.STUDENT || systemRoles.GRADUATED,
        then: Joi.string().required(),
      }),
      department: Joi.string().when("role", {
        is: systemRoles.STUDENT || systemRoles.GRADUATED,
        then: Joi.string().required(),
      }),
      startDate: Joi.string().when("role", {
        is: systemRoles.STUDENT || systemRoles.GRADUATED,
        then: Joi.string().required(),
      }),
      graduationDate: Joi.string().when("role", {
        is: systemRoles.GRADUATED,
        then: Joi.string().required(),
      }),
    }),
    postGraduateCourses: Joi.array().when("role", {
      is: systemRoles.GRADUATED,
      then: Joi.array().items(Joi.string()).required(),
    }),
    job: Joi.object({
      title: Joi.string().when("role", {
        is: systemRoles.GRADUATED,
        then: Joi.string().required(),
      }),
      companyName: Joi.string().when("role", {
        is: systemRoles.GRADUATED,
        then: Joi.string().required(),
      }),
    }),
  }).required(),
};

// =================================== log in schema =============================

export const logInSchema = {
  body: Joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }).required(),
};

//  ======================================= confirm Email ========================

export const confirmEmailSchema = {
  params: Joi.object({
    token: generalFields.token.required(),
  }).required(),
};

//  =============================== forget password  ==================
export const forgetPasswordSchema = {
  body: Joi.object({
    email: generalFields.email.required(),
  }),
};

// ======================== resetPasswordSchema ==================

export const resetPasswordSchema = {
  params: Joi.object({
    token: generalFields.token.required(),
  }).required(),
  body: Joi.object({
    otp: Joi.string().alphanum().length(4).required(),
    newPassword: generalFields.password.required(),
  }).required(),
};

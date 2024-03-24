import { Router } from "express";
import { validationCoreFunction } from "../../middlewares/validation.js";
import * as authValSchema from "./auth.validationSchemas.js";
import * as authController from "./auth.controller.js";

const router = Router();

router.post(
	"/signup",
	validationCoreFunction(authValSchema.signUpSchema),
	authController.signUp
);
// router.get(
// 	"/confirm/:token",
// 	validationCoreFunction(authValSchema.confirmEmailSchema),
// 	authController.confirmEmail
// );
// router.post(
// 	"/login",
// 	validationCoreFunction(authValSchema.logInSchema),
// 	authController.logIn
// );
// router.post(
// 	"/forgetPassword",
// 	validationCoreFunction(authValSchema.forgetPasswordSchema),
// 	authController.forgetPassword
// );
// router.post("/reset/:token",validationCoreFunction(authValSchema.resetPasswordSchema), authController.resetPassword);

export default router;
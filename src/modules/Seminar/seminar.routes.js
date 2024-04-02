import { Router } from "express";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import { validationCoreFunction } from "../../middlewares/validation.js";
import * as seminarValidationSchemas from "./seminar.validationSchema.js";
import * as seminarController from "./seminar.controller.js";
import { isAuth } from "../../middlewares/auth.js";
import { seminarRoles } from "./seminar.endpoints.js";

const router = Router();
router.post(
  "/createSeminar",
  isAuth(seminarRoles.createSeminar),
  multerCloudFunction(allowedExtensions.Image).single(
    "instructorProfilePicture"
  ),
  validationCoreFunction(seminarValidationSchemas.createSeminar),
  seminarController.createSeminar
);

export default router;

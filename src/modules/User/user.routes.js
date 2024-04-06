import { Router } from "express";
import { isAuth } from "../../middlewares/auth.js";
import { userRoles } from "./user.endpoints.js";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import * as userController from "./user.controller.js";

const router = Router();

router.patch(
  "/uploadProfilePicture",
  isAuth(userRoles.uploadProfilePicture),
  multerCloudFunction(allowedExtensions.Image).single("profilePicture"),
  userController.uploadProfilePicture
);

router.patch(
    "/uploadCv",
    isAuth(userRoles.uploadCV),
    multerCloudFunction(allowedExtensions.Image).single("cv"),
    userController.uploadCV
  );

export default router;

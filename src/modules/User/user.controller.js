import { graduatedModel } from "../../../DB/Models/graduated.model.js";
import { userModel } from "../../../DB/Models/user.model.js";
import { asyncHandler } from "../../utils/errorhandling.js";

// ========================= upload profile picture ======================

export const uploadProfilePicture = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.authUser.id);

  if (!user) {
    return next(new Error("in valid user", { cause: 500 }));
  }
  if (!req.file) {
    return next(new Error("upload your image", { cause: 400 }));
  }
  req.uploadPath = `${process.env.PROJECT_FOLDER}/users/${user.customId}/profilePicture`;
  const { public_id, secure_url } = await cloudinary.uploader
    .upload(req.file.path, {
      folder: req.uploadPath,
    })
    .catch((err) => next(new Error(err, { cause: 500 })));

  if (!public_id) {
    return next(
      new Error("failed to upload instructorProfilePicture", { cause: 500 })
    );
  }

  await user.updateOne({ profilePicture: { public_id, secure_url } });

  return res.status(200).json({ message: "Done", user });
});

// ============================== upload cv ===============================

export const uploadCV = asyncHandler(async (req, res, next) => {
  const user = await graduatedModel.findById(req.authUser.id);

  if (!user) {
    return next(new Error("in valid graduated student", { cause: 500 }));
  }
  if (!req.file) {
    return next(new Error("upload your image", { cause: 400 }));
  }
  req.uploadPath = `${process.env.PROJECT_FOLDER}/users/${user.customId}/cv`;
  const { public_id, secure_url } = await cloudinary.uploader
    .upload(req.file.path, {
      folder: req.uploadPath,
    })
    .catch((err) => next(new Error(err, { cause: 500 })));

  if (!public_id) {
    return next(new Error("failed to upload user cv", { cause: 500 }));
  }

  user.job.cv = { public_id, secure_url };
  await user.updateOne();

  return res.status(200).json({ message: "Done", user });
});

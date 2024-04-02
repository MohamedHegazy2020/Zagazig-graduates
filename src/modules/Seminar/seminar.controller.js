import { seminarModel } from "../../../DB/Models/seminar.model.js";
import cloudinary from "../../utils/coludinaryConfigrations.js";
import createCustomId from "../../utils/customIdGenerator.js";
import { asyncHandler } from "../../utils/errorhandling.js";
// ====================== create seminar ==============================

export const createSeminar = asyncHandler(async (req, res, next) => {
  const {
    title,
    appointment,
    description,
    maxNumOfAttendants,
    instructorName,
    instructorJobTitle,
    instructorAchivements,
  } = req.body;

  const isTitleDuplicate = await seminarModel.findOne({ title });
  if (isTitleDuplicate) {
    return next(new Error("seminar name is duplicated", { cause: 409 }));
  }

  if (!req.file) {
    return next(new Error("upload your image", { cause: 400 }));
  }
  const customId = createCustomId();

  req.uploadPath = `${process.env.PROJECT_FOLDER}/Seminar/Instructors/${customId}`;
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: req.uploadPath,
    }
  ).catch((err)=> next(new Error(err,{cause:500})))


  if(!public_id){
    return next(new Error("failed to upload instructorProfilePicture",{cause:500}))
  }
 const instructor = {
    name: instructorName,
    jobTitle: instructorJobTitle,
    profilePicture: { public_id, secure_url },
    achivements: instructorAchivements,
  };

  const seminar = await seminarModel.create({
    title,
    appointment,
    description,
    instructor,
    maxNumOfAttendants,customId
  });
  return res.status(201).json({ message: "Done", seminar });
});

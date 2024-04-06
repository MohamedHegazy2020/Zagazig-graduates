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
    maxNumOfAttendants,
    customId,
  });
  return res.status(201).json({ message: "Done", seminar });
});

export const applyForSeminar = asyncHandler(async (req, res, next) => {
  const { seminarId } = req.params;
  const seminar = await seminarModel.findById(seminarId);

  console.log(seminar);

  if (new Date(seminar.appointment) < Date.now()) {
    return next(new Error("expired seminar appoinment", { cause: 404 }));
  }

  if (seminar.attendantsId.includes(req.authUser.id)) {
    return next(new Error("already registered", { cause: 404 }));
  }
  if (seminar.maxNumOfAttendants === seminar.attendantsId.length) {
    return next(new Error(" all seats are reserverd", { cause: 404 }));
  }

  seminar.attendantsId.push(req.authUser.id);

  await seminar.save();

  return res.status(201).json({ message: "Done", seminar });
});

export const deleteSeminar = asyncHandler(async (req, res, next) => {

  const { seminarId } = req.params;


  const deletedseminar = await seminarModel.findByIdAndDelete(seminarId);

  if(!deletedseminar){
    return next(new Error('in-valid seminar id' ,{cause:404}))
  }

  return res.status(200).json({message:"Done" , deletedseminar})

});

import { log } from "console";
import { userModel } from "../../../DB/Models/user.model.js";
import { sendEmailService } from "../../services/sendEmailService.js";
import { asyncHandler } from "../../utils/errorhandling.js";
import { generateToken } from "../../utils/tokenFunctions.js";
import { emailTemplate } from "../../utils/emailTemplate.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const {
    userName,
    email,
    password,
    address,
    gender,
    age,
    phoneNumber,
    role,
    nationality,
    nationalNumber,
    universityEmail,
    college,
  } = req.body;
  // ------------- check if user exist------------
  const isEmailDuplicate = await userModel.findOne({ email });
  if (isEmailDuplicate) {
    return next(new Error("email is already exist", { cause: 400 }));
  }

  // --------------- hash password --------------------

  // ------------- generate token --------------------

  const token = generateToken({
    payload: { email },
    signature: process.env.CONFIRMATION_EMAIL_TOKEN,
    expiresIn: "1h",
  });

  // ------------------ confirm email -----------------
  const confirmationLink = `${req.protocol}://${req.headers.host}/auth/confirm/${token}`;

  const isConfirmationSent = sendEmailService({
    to: email,
    subject: "confirmation Email",
    message: emailTemplate({
      link: confirmationLink,
      linkData: "confirm email",
      subject: "confirmation Email",
    }),
  });

  if (!isConfirmationSent) {
    return next(new Error("fail to send confirmation email ", { cause: 400 }));
  }

  const user = await userModel({
    userName,
    email,
    password,
    address,
    gender,
    age,
    role,
    phoneNumber,
    nationality,
    nationalNumber,
    universityEmail,
    college,
  });
  const savedUser = await user.save();

  return res.status(201).json({ message: "Done", user: savedUser });
});

// =================== confirmation email ======================================

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifyToken({
    token,
    signature: process.env.CONFIRMATION_EMAIL_TOKEN,
  });
  const user = await userModel.findOne({ email });

  if (!user?.isConfirmed == false) {
    return next(new Error("already confirmed", { cause: 400 }));
  }
  await user.updateOne({ isConfirmed: true });
  // const user = await userModel.create({ userName, email, password, address, gender, age, phoneNumber,isConfirmed:true })
  return res
    .status(200)
    .json({ message: "confirmed Done , please try to login" });
});

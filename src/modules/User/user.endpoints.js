import { systemRoles } from "../../utils/systemRoles.js";

export const userRoles = {
  uploadProfilePicture: [
    systemRoles.ADMIN,
    systemRoles.COMPANY,
    systemRoles.GRADUATED,
    systemRoles.STUDENT,
  ],
  uploadCV:[systemRoles.GRADUATED]
};

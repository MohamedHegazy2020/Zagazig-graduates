import { systemRoles } from "../../utils/systemRoles.js";

export const seminarRoles = {
  createSeminar: [systemRoles.ADMIN],
  deleteSeminar: [systemRoles.ADMIN],
  applyForSeminar: [systemRoles.STUDENT, systemRoles.GRADUATED],
};

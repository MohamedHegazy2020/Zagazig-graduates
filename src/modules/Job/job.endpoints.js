import { systemRoles } from "../../utils/systemRoles.js";

export const jobRules = {
  createJob: [systemRoles.ADMIN, systemRoles.COMPANY],
  deleteJob: [systemRoles.ADMIN, systemRoles.COMPANY],
  applyForJob: [systemRoles.ADMIN, systemRoles.GRADUATED],
};

import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.middleware.js";
import {
  cancelAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router
  .route("/")
  .post(isPatientAuthenticated, postAppointment)
  .get(isAdminAuthenticated, getAllAppointments)
  .put(isAdminAuthenticated, updateAppointmentStatus)
  .delete(isAdminAuthenticated, cancelAppointment);

export default router;

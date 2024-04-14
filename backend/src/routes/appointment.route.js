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

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/all", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/cancel/:id", isAdminAuthenticated, cancelAppointment);

export default router;
